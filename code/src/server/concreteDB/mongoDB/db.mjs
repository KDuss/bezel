import mongodb from 'mongodb';
import config from '../../../public/config.mjs';

/**
 * Connect to database
 */
const { MongoClient } = mongodb;
const url = `mongodb://${config.db.host}:${config.db.port}`;

/**
 * Dataset specification
 */
const { dbName, collectionName } = config.db;

const client = new MongoClient(url, { useUnifiedTopology: true });

const state = {
    db: null,
};

const connect = cb => {
    if (state.db) {
        cb();
    } else {
        client.connect().then(() => {
            const database = client.db(dbName);
            const collection = database.collection(collectionName);
            state.db = collection;
            cb();
        }, error => {
            console.error(error);
            cb(error);
        });
    }
};

const getDB = () => state.db;
const ObjectId = mongodb.ObjectID;

export { getDB, connect, ObjectId };
