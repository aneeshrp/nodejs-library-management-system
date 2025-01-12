import { privateDecrypt } from 'crypto';
import dotenv from 'dotenv';

dotenv.config();

if( !process.env.MONGO_URI){
    throw new Error('Database connection string needs to be provided');
}

export const MONGO_URI = process.env.MONGO_URI;
export const APP_PORT = process.env.PORT || 3000;
export const RAB_MQ_URI = process.env.RAB_MQ_URL;
export const JWT_SECRET = process.env.JWT_SECRET;