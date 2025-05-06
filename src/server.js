import express from 'express';
import cors from 'cors';
import pino from 'pino-http';
import { getEnvVar } from './utils/getEnvVar.js';
import contactRouter from './routers/contacts.js';
import { errorHandler } from './middlewares/errorHandler.js';
import { notFoundHandler } from './middlewares/notFoundHandler.js';
import authRouter from './routers/auth.js';
import cookieParser from 'cookie-parser';


export const setupServer = () => {
    const app = express();


    app.use(cors());
    app.use(cookieParser());
    app.use(express.json());
    app.use(pino({
        transport: {
            target: 'pino-pretty',
        }
    }));

    app.use('/auth', authRouter);
    app.use(contactRouter);

    app.use(notFoundHandler);

    app.use(errorHandler);

    const PORT = Number(getEnvVar('PORT', 3000)); ;

    app.listen(PORT, () => {
        console.log(`Server start on port ${PORT}`);
    });
};

