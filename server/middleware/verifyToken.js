"use strict"

const jwt = require("jsonwebtoken");

const verifyToken = () => {
  return async (req, res, next) => {
    try {
      jwt.verify(req.headers.token, "secret");
      next();
    } catch (err) {
      res.status(401).send({message:"Token missing or expired."});
    }
  }

}

module.exports = {
  verifyToken
}

