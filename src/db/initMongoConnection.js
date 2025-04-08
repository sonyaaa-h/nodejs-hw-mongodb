import mongoose from 'mongoose';
import { getEnvVar } from '../utils/getEnvVar.js';

export const initMongoConnection = async () => {
    try {
        const user = getEnvVar('MONGODB_USER');
        const password = getEnvVar('MONGODB_PASSWORD');
        const url = getEnvVar('MONGODB_URL');
        const db = getEnvVar('MONGODB_DB');
        await mongoose.connect(`mongodb+srv://${user}:${password}@${url}/${db}?retryWrites=true&w=majority&appName=Contacts`);
        console.log("Database connected");
    }
    catch (e) {
        console.log(e.message);
        throw e;
    }
};