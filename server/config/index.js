module.exports = {
    mongodb:{
        username: encodeURIComponent(process.env.USER),
        password: encodeURIComponent(process.env.PASSWORD),
        db: "imdb",
        defaultLimit: 10,
        sortOrder: {creation_date:-1}
    }
}
