"use strict"

const mongodb = require("../../../helper/mongodb");
const collection = "movie";

const listMovies = (services) => {
    return async (req, res, next) => {
        try {
            let limit = services.config.mongodb.defaultLimit, skip = 0;
            if (req.query && req.query.limit && req.query.page) {
                limit = req.query.limit;
                skip = (req.query.page - 1) * limit;
            }
            let filterObj = null;
            if (req.query && req.query.filter  && req.query.filter !== "all") {
                filterObj = {
                    genre: { $all: [] }
                };
                filterObj.genre.$all = req.query.filter.split(",")
            }
            let sort = {}
            if (req.query && req.query.sort)
                sort[req.query.sort] = parseInt(req.query.sortType) || 1

            let search = null;
            if(req.query && req.query.q && req.query.q !== "null")
                search = req.query.q;

            let result = await mongodb.getDocuments(services.db, collection, filterObj, sort, limit, skip, search);
            res.status(200).json({ "count": result.length, "list": result })
        } catch (err) {
            console.error(err);
        }
    };
}


const getCount = (services) => {
    return async (req, res, next) => {
        try {
            let filterObj = null;
            if (req.query && req.query.filter  && req.query.filter !== "all") {
                filterObj = {
                    genre: { $all: [] }
                };
                filterObj.genre.$all = req.query.filter.split(",")
            }
            let search = null;
            if(req.query && req.query.q && req.query.q !== "null")
                search = req.query.q;

            let result = await mongodb.getCount(services.db, collection, filterObj, search);
            res.status(200).json({ "count": result })
        } catch (err) {
            console.error(err);
        }
    };
}

// const search = (services) => {
//     return async (req, res, next) => {
//         try {
//             if(req.query && req.query.q){
//                 let result = await mongodb.search(services.db, collection, req.query.q, sort, limit, skip);
//                 res.status(200).json({ "count": result.length, "list": result })
//             }
//         } catch (err) {
//             console.error(err);
//         }
//     };
// }

const getMovieDetails = (services) => {
    return async (req, res, next) => {
        try {
            if (req.params && req.params.id) {
                let result = await mongodb.getDocumentById(services.db, collection, req.params.id)
                res.status(200).json({ "data": result })
            }
        } catch (err) {
            console.error(err)
        }
    };
}

const addMovie = (services) => {
    return async (req, res, next) => {
        try {
            let d = new Date().getTime();
            let movie = req.body
            movie["is_active"] = true
            movie["creation_date"] = d
            movie["last_modified_date"] = d
            movie["added_by"] = req.headers["user"]

            let result = await mongodb.insertDocuments(services.db, collection, movie)
            res.status(201).json({ "message": result })
        } catch (err) {
            console.error(err)
        }
    }
}

const updateMovie = (services) => {
    return async (req, res, next) => {
        try {
            let d = new Date().getTime();
            let result = await mongodb.updateDocument(services.db, collection, req.params.id, req.body)
            res.status(201).json({ "message": result })
        } catch (err) {
            console.error(err)
        }
    }
}

const deleteMovie = (services) => {
    return async (req, res, next) => {
        try {
            if (req.params && req.params.id) {
                let result = await mongodb.deleteDocument(services.db, collection, req.params.id)
                res.status(204).send();
            }
        } catch (err) {
            console.error(err)
        }
    };
}

module.exports = {
    listMovies,
    getCount,
    // search,
    getMovieDetails,
    addMovie,
    updateMovie,
    deleteMovie
}