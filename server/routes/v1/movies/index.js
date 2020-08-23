"use strict";

const routes = require("express").Router({ mergeParams: true });
const movie = require("./logic");
const auth = require("../../../middleware/verifyToken")

module.exports = (services) => {

    routes.get("/search", movie.search(services));
    routes.get("/", movie.listMovies(services));
    routes.get("/:id", movie.getMovieDetails(services));
    //Authotized, need an auth middleware
    routes.post("/", auth.verifyToken(), movie.addMovie(services));
    routes.put("/:id", auth.verifyToken(), movie.updateMovie(services));
    routes.delete("/:id", auth.verifyToken(), movie.deleteMovie(services));

    return routes;
};