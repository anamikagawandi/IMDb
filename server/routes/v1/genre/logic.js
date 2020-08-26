"use strict"

const mongodb = require("../../../helper/mongodb");
const collection = "genre";

const listGenre = (services) => {
    return async (req, res, next) => {
        try {
            let result = await mongodb.getDocuments(services.db, collection, {is_active: true}, null, 0, 0, null);
            let list = [];
            result.forEach(element => {
                list.push(element.name);
            });
            res.status(200).json({ "count":list.length,"list": list })
        } catch (err) {
            console.error(err)
        }
    };
}

const addGenre = (services) => {
    return async (req, res, next) => {
        try {
            let d = new Date().getTime();
            let genre = {
                name: req.body.name,
                is_active: true,
                creation_date: d,
                last_modified_date: d
            }
            let result = await mongodb.insertDocuments(services.db, collection, genre)
            res.status(200).json({ "message": result })
        } catch (err) {
            console.error(err)
        }
    }
}

//Not required
// const updateGenre = () => {
//     return async (req, res, next) => {
//         try {
//             let d = new Date().getTime();
//             let genre = {
//                 name: req.body.name,
//                 is_active: true,
//                 creation_date: d,
//                 last_modified_date: d
//             }
//             let result = await mongodb.insertDocuments(services.db, "genre", genre)
//             res.status(200).json({ "message": result })
//         } catch (err) {

//         }
//         res.status(200).json({ "message": "This is updateGenre" })
//     };
// }

const deleteGenre = (services) => {
    return async (req, res, next) => {
        try {
            if(req.params && req.params.id){
                let result = await mongodb.deleteDocument(services.db, collection, req.params.id)
                res.status(200).json({ "message": result })
            } 
        } catch (err) {
            console.error(err)
        }
    };
}


module.exports = {
    listGenre,
    addGenre,
    // updateGenre,
    deleteGenre
}