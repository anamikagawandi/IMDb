"use strict"

const listGenre = () => {
    return (req, res, next) => {
        res.status(200).json({ "message": "This is listGenre" })
    };
}

const updateGenre = () => {
    return (req, res, next) => {
        res.status(200).json({ "message": "This is updateGenre" })
    };
}

const deleteGenre = () => {
    return (req, res, next) => {
        res.status(200).json({ "message": "This is deleteGenres" })
    };
}


module.exports = {
    listGenre,
    updateGenre,
    deleteGenre
}