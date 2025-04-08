import express from 'express';
import cors from 'cors';
import pino from 'pino-http';
import { getEnvVar } from './utils/getEnvVar.js';

import { getContacts } from './services/contacts.js';
import { getContactById } from './services/contacts.js';

export const setuupServer = () => {
    const app = express();


    app.use(cors());
    app.use(express.json());
    app.use(pino({
        transport: {
            target: 'pino-pretty',
        }
    }));

    app.get('/contacts', async (req, res) => {
        const data = await getContacts();
        res.json({
            status: 200,
            message: "Successfully found contacts!",
            data,
        });
    });

    app.get("/contacts/:contactId", async (req, res) => {
        const { contactId } = req.params;

        const data = await getContactById(contactId);

        if (!data) {
            return res.status(404).json({
                message: "Contact not found",
            });
        }

        res.json({
            status: 200,
            message: `Successfully found contact with id ${contactId}!`,
            data,
        });
    });

    app.use((req, res) => {
        res.status(404).json({
            message: `${req.url} not found`
        });
    });

    const PORT = Number(getEnvVar('PORT', 3000)); ;

    app.listen(PORT, () => {
        console.log(`Server start on port ${PORT}`);
    });
};

