import { Db, MongoClient, MongoOIDCError } from "mongodb";
import { MONGO_URI } from "../config";

let db : Db;

export const connectToDatabase = async (): Promise<Db> => {
    try {
        const mgClient =  new MongoClient(MONGO_URI);
        await mgClient.connect();
        db = mgClient.db();
        return db;
    } catch (error) {
        console.log(error);
        throw new Error('Unable to connect to database')
    }
}

export const getDb = () : Db => {
    if( !db) throw new Error("Unable to find a database connection");

    return db;
}