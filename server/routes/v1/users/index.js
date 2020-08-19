"use strict";

const routes = require("express").Router({ mergeParams: true });
const user = require("./logic")

module.exports = (services) => {

    routes.get("/:username", user.getUserDetails(services));
    routes.put("/:username", user.updateUser(services));
    routes.delete("/:username", user.deleteUser(services));

    return routes;
};