"use strict";

const routes = require("express").Router({ mergeParams: true });
const genre = require("./logic")

module.exports = (services) => {

    routes.get("/", genre.listGenre(services));
    // routes.get("/genre/:id",movie.());
    //Authorized
    routes.put("/:id", genre.updateGenre(services));
    routes.delete("/:id", genre.deleteGenre(services));

    return routes;
};