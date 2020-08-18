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


const getDocuments = async (db, collection, filter, skip) => {
    try {
        let result = await db.collection(collection).find(filter).skip(skip).toArray();
        return result
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
    insertDocuments,
    getDocuments,
    getDistinct
}



getDB().then(async (db) => {
    let d = new Date().getTime();

    let array = []


    let g = await getDistinct(db, "movies", "genre")
    console.log(g)

    await g.forEach(element => {
        let data = {
            name: null,
            is_active: true,
            creation_date: d,
            last_modified_date: d
        }
        data.name = element
        array.push(data)
    });

console.log(array)
    insertDocuments(db, "genre", array).then(e => console.log(e)).catch(err => console.error(err))
    // db.close();
})