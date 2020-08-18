"use strict"

const getUserDetails = () => {
    return (req, res, next) => {
        res.status(200).json({ "message": "This is getUserDetails" })
    };
}

const updateUser = () => {
    return (req, res, next) => {
        res.status(200).json({ "message": "This is updateUser" })
    };
}

const deleteUser = () => {
    return (req, res, next) => {
        res.status(200).json({ "message": "This is deleteUser" })
    };
}


module.exports = {
    getUserDetails,
    updateUser,
    deleteUser
}