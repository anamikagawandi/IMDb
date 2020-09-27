"use strict"

const http = require("http");
const app = require("./app");

app.getApp().then(res=>{
    const server = http.createServer(res);
    server.listen(3000, (err) => {
        if (err) {
            console.log(err);
        } else {
            console.log("Server started")
        }
    })
})