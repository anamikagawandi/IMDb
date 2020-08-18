"use strict";

const routes = require("express").Router({ mergeParams: true });
const movie = require("./logic")

module.exports = (services) => {

    /*
    Query params: skip & limit for pagination,
    sort = "field",
    sort-type = "asc/desc"
    filter = "abc,pyt" since its just on genre
    */
    routes.get("/", movie.listMovies(services));
    routes.get("/:id", movie.getMovieDetails(services));
    //Authotized, need an auth middleware
    routes.post("/", movie.addMovie(services));
    routes.put("/:id", movie.updateMovie(services));
    routes.delete("/:id", movie.deleteMovie(services));

    return routes;
};