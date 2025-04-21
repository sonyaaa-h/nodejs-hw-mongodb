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

    const contactQuery = ContactsCollection.find();
    if(filters.contactType) {
        contactQuery.where("contactType").equals(filters.contactType);
    }

    if(typeof filters.isFavourite === "boolean") {
        contactQuery.where("isFavourite").equals(filters.isFavourite);
    }

    const data = await contactQuery
        .skip(skip)
        .limit(perPage)
        .sort({ [sortBy]: sortOrder });
    const totalItems = await ContactsCollection.find().merge(contactQuery).countDocuments();

    const paginationData = calcPaginationData({ page, perPage, totalItems });

    return {
        data,
        page,
        perPage,
        totalItems,
        ...paginationData,
    };
};

export const getContactById = (id) => ContactsCollection.findOne({ _id: id });

export const createContact = (payload) => ContactsCollection.create(payload);

export const updateContact = async (id, payload) => {
    const data = await ContactsCollection.findOneAndUpdate(
        { _id: id },
        { $set: payload },
    );

    return data;
};

export const deleteContact = (id) =>
    ContactsCollection.findOneAndDelete({ _id: id });
