"use strict"

const express = require("express")
const app = express()
const http = require("http")
const server = http.createServer(app)
const bodyParser = require("body-parser")
const routes = require("./routes/v1/routes")
const config = require("./config/index")
const db = require("./helper/mongodb");
var cors = require('cors');

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))
app.use(cors())
const services = {
    config: config
}

db.getDB().then(db => {
    services["db"] = db;
    app.use("/imdb", routes(services))

    server.listen(3000, (err) => {
        if (err) {
            console.log(err);
        } else {
            console.log("Server started")
        }
    })

}
).catch(err => console.error(err));
