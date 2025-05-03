import ContactsCollection from '../db/models/Contacts.js';
import { calcPaginationData } from '../utils/calcPaginationData.js';
import { sortList } from '../constants/index.js';

export const getContacts = async ({
    page = 1,
    perPage = 10,
    sortBy = '_id',
    sortOrder = sortList[0],
    filters = {},
}) => {
    const skip = (page - 1) * perPage;
    console.log(
        'filters.isFavourite:',
        filters.isFavourite,
        typeof filters.isFavourite,
    );

    const contactQuery = ContactsCollection.find();

    if(filters.userId){
        contactQuery.where('userId').equals(filters.userId);
    }

    if (filters.contactType) {
        contactQuery.where('contactType').equals(filters.contactType);
    }

    if (filters.isFavourite === true || filters.isFavourite === 'true') {
        contactQuery.where('isFavourite').equals(true);
    } else if (filters.isFavourite === false || filters.isFavourite === 'false') {
        contactQuery.where('isFavourite').equals(false);
    }

    // const data = await contactQuery
    //     .skip(skip)
    //     .limit(perPage)
    //     .sort({ [sortBy]: sortOrder });
    // const totalItems = await ContactsCollection.find().merge(contactQuery).countDocuments();

    const [totalItems, data] = await Promise.all([
        ContactsCollection.find().merge(contactQuery).countDocuments(),
        contactQuery
            .skip(skip)
            .limit(perPage)
            .sort({ [sortBy]: sortOrder }),
    ]);

    const paginationData = calcPaginationData({ page, perPage, totalItems });

    return {
        data,
        page,
        perPage,
        totalItems,
        ...paginationData,
    };
};

export const getContactById = (id, userId) => ContactsCollection.findOne({ _id: id, userId });

export const createContact = (payload, userId) => ContactsCollection.create({...payload, userId});

export const updateContact = async (id, payload, userId) => {
    const data = await ContactsCollection.findOneAndUpdate(
        { _id: id, userId },
        { $set: payload },
    );

    return data;
};

export const deleteContact = (id, userId) =>
    ContactsCollection.findOneAndDelete({ _id: id, userId });
