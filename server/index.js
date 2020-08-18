"use strict"

const express = require("express")
const app = express()
const http = require("http")
const server = http.createServer(app)
const bodyParser = require("body-parser")
const routes = require("./routes/v1/routes")
const config = require("./config/index")
const db = require("./helper/mongodb")

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))

let services = {
    config: config,
    db: null
}

db.getDB().then(db => services.db = db).catch(err => console.error(err));

app.use("/imdb",routes(services))


server.listen(3000,(err) => {
    if(err){
        console.log(err);
    }else{
        console.log("Server started")
    }
})