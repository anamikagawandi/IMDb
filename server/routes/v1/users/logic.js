"use strict"

const mongodb = require("../../../helper/mongodb");
const md5 = require("md5");
const jwt = require('jsonwebtoken')

const getToken = (services) => {
    return async (req, res, next) => {
        try {
            if (req.headers && req.headers.username && req.headers.password) {
                let hash = md5(req.headers.password)
                let filter = {
                    username: req.headers.username,
                    password: hash,
                    is_active: true
                }
                let isValid = await mongodb.ifExists(services.db, "users", filter)
                if (isValid) {
                    let token = jwt.sign({
                        data: req.headers.email
                    }, "secret", { expiresIn: "1h" });
                    res.status(200).send({ token: token });
                } else {
                    res.status(401).json({ message: "Invalid User" })
                }
            } else {
                res.status(400).json({ message: "Headers Missing" })
            }
        } catch (err) {
            console.error(err)
        }
    }
}

// const updateUser = () => {
//     return (req, res, next) => {
//         res.status(200).json({ "message": "This is updateUser" })
//     };
// }

// const deleteUser = () => {
//     return (req, res, next) => {
//         res.status(200).json({ "message": "This is deleteUser" })
//     };
// }


module.exports = {
    getToken,
    // updateUser,
    // deleteUser
}