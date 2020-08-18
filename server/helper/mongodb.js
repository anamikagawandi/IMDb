"use strict"

const MongoClient = require('mongodb').MongoClient;
const config = require("../config/index")
const dbName = config.mongodb.db;


const getDB = async () => {
    const url = `mongodb+srv://${config.mongodb.username}:${config.mongodb.password}@cluster0-hquwp.gcp.mongodb.net/
${dbName}?retryWrites=true&w=majority`;
    let client = null;
    try {
        client = await MongoClient.connect(url, { useUnifiedTopology: true });
        return client.db(dbName);
    } catch (err) {
        console.error(`Something went wrong: ${err}`);
    }
}


const getDocuments = async (db, collection, filter, skip) => {
    try {
        let result = await db.collection(collection).find(filter).skip(skip).toArray();
        return result
    } catch (err) {
        throw new Error(`Something went wrong: ${err}`);
    }
}

const getDocumentById = async (db, collection, id) => {
    try {
        let result = await db.collection(collection).findOne({_id : id});
        return result
    } catch (err) {
        throw new Error(`Something went wrong: ${err}`);
    }
}

const insertDocuments = async (db, collection, data) => {
    try {
        let result = null;
        if (Array.isArray(data)) {
            const options = { ordered: true };
            result = await db.collection(collection).insertMany(data, options);
        } else if (data) {
            result = await db.collection(collection).insertOne(data)
        } else {
            throw new Error("Invalid Data")
        }
        return `${result.insertedCount} documents were inserted`;
    } catch (err) {
        throw new Error(`Something went wrong: ${err}`);
    }
}

const updateDocument = async (db, collection, id, data) => {
    try {
        data["last_modified_date"] = new Date().getTime();
        let result = await db.collection(collection).replaceOne({_id : id},data);
        return `${result.modifiedCount} document updated`
    } catch (err) {
        throw new Error(`Something went wrong: ${err}`);
    }
}

const deleteDocument = async (db, collection, id) => {
    try {
        let result = await db.collection(collection).updateOne({_id : id},
             {$set: 
                { 
                    is_active: false,
                    last_modified_date: new Date().getTime()
                }});
        return `${result.modifiedCount} document deleted`
    } catch (err) {
        throw new Error(`Something went wrong: ${err}`);
    }
}


const getDistinct = async (db, collection, field) => {
    try {
        let result = await db.collection(collection).distinct(field);
        return result
    } catch (err) {
        throw new Error(`Something went wrong: ${err}`);
    }
}


module.exports = {
    getDB,
    getDocuments,
    getDocumentById,
    insertDocuments,
    updateDocument,
    deleteDocument,
    getDistinct,
}
