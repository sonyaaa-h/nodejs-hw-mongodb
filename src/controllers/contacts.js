import {
    createContact,
    deleteContact,
    getContactById,
    getContacts,
    updateContact,
} from '../services/contacts.js';
import createHttpError from 'http-errors';
import { parsePaginationParams } from '../utils/parsePaginationParams.js';
import { parseSortParams } from '../utils/parseSortParams.js';
import { contactSortFields } from '../db/models/Contacts.js';
import { parseContactFilterParams } from '../utils/filters/parseContactFilterParams.js';
import { saveFileToUploadDir } from '../utils/saveFileToUploadDir.js';
import { saveFileToCloudinary } from '../utils/saveFileToCloudinary.js';
import { getEnvVar } from '../utils/getEnvVar.js';

export const getContactsController = async (req, res) => {
    const paginationParams = parsePaginationParams(req.query);
    const sortParams = parseSortParams(req.query, contactSortFields);
    const filters = parseContactFilterParams(req.query);
    filters.userId = req.user._id;
    const data = await getContacts({
        ...paginationParams,
        ...sortParams,
        filters,
    });
    res.json({
        status: 200,
        message: 'Successfully found contacts!',
        data,
    });
};

export const getContactByIdController = async (req, res) => {
    const { contactId } = req.params;
    const userId = req.user._id;

    const data = await getContactById(contactId, userId);

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
    const { _id: userId } = req.user;
    const photo = req.file;
    let photoUrl;
    console.log('PARAMS:', req.params);

    if (photo) {
        if (getEnvVar('ENABLE_CLOUDINARY') === 'true') {
            photoUrl = await saveFileToCloudinary(photo);
        } else {
            photoUrl = await saveFileToUploadDir(photo);
        }
    }

    const data = await createContact({ ...req.body, photo: photoUrl }, userId);

    res.status(201).json({
        status: 201,
        message: 'Successfully created a contact!',
        data,
    });
};

export const updateContactController = async (req, res) => {
    const { contactId } = req.params;
    const userId = req.user._id;
    const photo = req.file;
    let photoUrl;

    if (photo) {
        if (getEnvVar('ENABLE_CLOUDINARY') === 'true') {
            photoUrl = await saveFileToCloudinary(photo);
        } else {
            photoUrl = await saveFileToUploadDir(photo);
        }
    }

    const contact = await updateContact(contactId, userId, {
        ...req.body,
        photo: photoUrl,
    });

    if (!contact) {
        throw createHttpError(404, 'Contact not found');
    }

    res.json({
        status: 200,
        message: 'Successfully patched a contact!',
        data: contact,
    });
};

export const deleteContactController = async (req, res) => {
    const { contactId } = req.params;
    const userId = req.user._id;

    const data = await deleteContact(contactId, userId);

    if (!data) {
        throw createHttpError(404, 'Contact not found');
    }

    res.status(204).send();
};
