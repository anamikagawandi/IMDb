"use strict"

const express = require("express")
const app = express()
const bodyParser = require("body-parser")
const routes = require("./routes/v1/routes")
const config = require("./config/index")
const db = require("./helper/mongodb");
const cors = require('cors');

const getApp = () => {
    app.use(bodyParser.json())
    app.use(bodyParser.urlencoded({ extended: false }))
    app.use(cors())
    const services = {
        config: config
    }
    return db.getDB().then(db => {
        services["db"] = db;
        app.use("/imdb", routes(services));
        return app;
    }
    ).catch(err => console.error(err));

}

module.exports = {
    getApp
}