import {
    createContact,
    deleteContact,
    getContactById,
    getContacts,
    updateContact,
} from '../services/contacts.js';
import createHttpError from 'http-errors';

export const getContactsController = async (req, res) => {
    const data = await getContacts();
    res.json({
        status: 200,
        message: 'Successfully found contacts!',
        data,
    });
};

export const getContactByIdController = async (req, res) => {
    const { contactId } = req.params;

    const data = await getContactById(contactId);

    // if (!data) {
    //     return res.status(404).json({
    //         message: 'Contact not found',
    //     });
    // }

    if (!data) {
        throw createHttpError(404, `Contact with id ${contactId} not found`);
    }

    res.status(200).json({
        status: 200,
        message: `Successfully found contact with id ${contactId}!`,
        data,
    });
};

export const createContactController = async (req, res) => {
    const data = await createContact(req.body);

    res.status(201).json({
        status: 201,
        message: 'Successfully created a contact!',
        data,
    });
};

export const updateContactController = async (req, res) => {
    const { contactId } = req.params;
    const contact = await updateContact(contactId, req.body);

    if (!contact) {
        throw createHttpError(404, 'Contact not found');
    }

    res.json({
        status: 200,
        message: 'Successfully patched a contact!',
        data: contact,
    });
};

export const deleteContactController = async(req, res) => {
    const { contactId } = req.params;
    const data = await deleteContact(contactId);

    if (!data) {
        throw createHttpError(404, 'Contact not found');
    }

    res.status(204).send();
};
