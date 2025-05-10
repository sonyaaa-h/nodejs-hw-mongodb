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

contactRouter.get('/', ctrlWrapper(getContactsController));

contactRouter.get(
    '/:contactId',
    isValidId,
    ctrlWrapper(getContactByIdController),
);

contactRouter.post(
    '/',
    upload.single('photo'),
    validateBody(contactAddSchema),
    ctrlWrapper(createContactController),
);

contactRouter.patch(
    '/:contactId',
    isValidId,
    upload.single('photo'),
    validateBody(contactUpdateSchema),
    ctrlWrapper(updateContactController),
);

contactRouter.delete(
    '/:contactId',
    isValidId,
    ctrlWrapper(deleteContactController),
);

export default contactRouter;