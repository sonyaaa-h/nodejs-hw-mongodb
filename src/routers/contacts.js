import { Router } from 'express';
import {
    createContactController,
    deleteContactController,
    getContactByIdController,
    getContactsController,
    updateContactController,
} from '../controllers/contacts.js';
import { ctrlWrapper } from '../utils/ctrlWrapper.js';
import { validateBody } from '../middlewares/validateBody.js';
import { contactAddSchema, contactUpdateSchema } from '../validation/contact.js';
import { isValidId } from '../middlewares/isValidId.js';
import { authenticate } from '../middlewares/authenticate.js';
import { upload } from '../middlewares/multer.js';

const contactRouter = Router();

contactRouter.use(authenticate);

contactRouter.get('/contacts', ctrlWrapper(getContactsController));

contactRouter.get(
    '/contacts/:contactId',
    isValidId,
    ctrlWrapper(getContactByIdController),
);

contactRouter.post(
    '/contacts',
    upload.single('photo'),
    validateBody(contactAddSchema),
    ctrlWrapper(createContactController),
);

contactRouter.patch(
    '/contacts/:contactId',
    isValidId,
    upload.single('photo'),
    validateBody(contactUpdateSchema),
    ctrlWrapper(updateContactController),
);

contactRouter.delete(
    '/contacts/:contactId',
    isValidId,
    ctrlWrapper(deleteContactController),
);

export default contactRouter;
