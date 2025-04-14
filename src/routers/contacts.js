import { Router } from 'express';
import {
    createContactController,
    deleteContactController,
    getContactByIdController,
    getContactsController,
    updateContactController,
} from '../controllers/contacts.js';
import { ctrlWrapper } from '../utils/ctrlWrapper.js';

const contactRouter = Router();

contactRouter.get('/contacts', ctrlWrapper(getContactsController));

contactRouter.get(
    '/contacts/:contactId',
    ctrlWrapper(getContactByIdController),
);

contactRouter.post('/contacts', ctrlWrapper(createContactController));

contactRouter.patch('/contacts/:contactId', ctrlWrapper(updateContactController));

contactRouter.delete('/contacts/:contactId', ctrlWrapper(deleteContactController));

export default contactRouter;
