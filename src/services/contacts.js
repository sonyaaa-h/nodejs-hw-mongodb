import ContactsCollection from '../db/models/Contacts.js';

export const getContacts = () => ContactsCollection.find();

export const getContactById = (id) => ContactsCollection.findOne({ _id: id });

export const createContact = (payload) => ContactsCollection.create(payload);

export const updateContact = async (id, payload) => {
    const data = await ContactsCollection.findOneAndUpdate(
        { _id: id },
        { $set: payload },
        {
            new: true,
        },
    );

    return data;
};

export const deleteContact = id => ContactsCollection.findOneAndDelete({_id: id});
