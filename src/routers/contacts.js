import { Router } from 'express';
import { getContactByIdController, getContactsController } from '../controllers/contacts.js';
import { ctrlWrapper } from '../utils/ctrlWrapper.js';

const contactRouter = Router();

contactRouter.get('/contacts', ctrlWrapper(getContactsController));
contactRouter.get('/contacts/:contactId', ctrlWrapper(getContactByIdController));

export default contactRouter;
