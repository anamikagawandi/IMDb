"use strict";

const express = require("express");
const routes = express.Router({ mergeParams: true });
const movie = require("./movies/index");
const user = require("./users/index");
const genre  = require("./genre/index")

module.exports = (services) => {

    routes.use("/movie", movie(services));

    routes.use("/user", user(services));

    routes.use("/genre", genre(services));

    return routes;
};