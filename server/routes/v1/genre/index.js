"use strict";

const routes = require("express").Router({ mergeParams: true });
const genre = require("./logic")

module.exports = (services) => {

    routes.get("/", genre.listGenre(services));
    //Authorized
    routes.post("/",genre.addGenre(services));
    // routes.put("/:id", genre.updateGenre(services));
    routes.delete("/:id", genre.deleteGenre(services));

    return routes;
};