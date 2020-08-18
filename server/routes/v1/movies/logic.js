"use strict"

const listMovies = () => {
    return (req, res, next) => {
        res.status(200).json({ "message": "This is listAll" })
    };
}

const getMovieDetails = () => {
    return (req, res, next) => {
        res.status(200).json({ "message": "This is movieDetails" })
    };
}


const addMovie = () => {
    return (req, res, next) => {
        res.status(200).json({ "message": "This is addMovie" })
    };
}


const updateMovie = () => {
    return (req, res, next) => {
        res.status(200).json({ "message": "This is updateMovie" })
    };
}


const deleteMovie = () => {
    return (req, res, next) => {
        res.status(200).json({ "message": "This is deleteMovie" })
    };
}


module.exports = {
    listMovies,
    getMovieDetails,
    addMovie,
    updateMovie,
    deleteMovie
}