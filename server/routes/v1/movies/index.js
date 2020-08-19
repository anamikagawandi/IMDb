"use strict";

const routes = require("express").Router({ mergeParams: true });
const movie = require("./logic")

module.exports = (services) => {

    routes.get("/", movie.listMovies(services));
    routes.get("/:id", movie.getMovieDetails(services));
    //Authotized, need an auth middleware
    routes.post("/", movie.addMovie(services));
    routes.put("/:id", movie.updateMovie(services));
    routes.delete("/:id", movie.deleteMovie(services));

    return routes;
};