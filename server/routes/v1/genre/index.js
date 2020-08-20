"use strict";

const routes = require("express").Router({ mergeParams: true });
const genre = require("./logic");
const auth = require("../../../middleware/verifyToken")

module.exports = (services) => {

    routes.get("/", genre.listGenre(services));
    //Authorized
    routes.post("/", auth.verifyToken(), genre.addGenre(services));
    // routes.put("/:id", genre.updateGenre(services));
    routes.delete("/:id", auth.verifyToken(), genre.deleteGenre(services));

    return routes;
};