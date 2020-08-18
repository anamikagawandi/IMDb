"use strict"

const listGenre = () => {
    return (req, res, next) => {
        res.status(200).json({ "message": "This is listGenre" })
    };
}

const addGenre = () => {
    let d = new Date().getTime();

    let array = []


    // let g = await getDocuments(db, "movies", null, 0)
    // console.log(g)

    // await g.forEach(element => {
    //     let data = {
    //         name: null,
    //         is_active: true,
    //         creation_date: d,
    //         last_modified_date: d
    //     }
    //     data.name = element
    //     array.push(data)
    // });
    let r = insertDocuments(db, "genre", array).then(e => console.log(e)).catch(err => console.error(err))
    res.status(200).json({ "message": r })
}

const updateGenre = () => {
    return (req, res, next) => {
        res.status(200).json({ "message": "This is updateGenre" })
    };
}

const deleteGenre = () => {
    return (req, res, next) => {
        res.status(200).json({ "message": "This is deleteGenres" })
    };
}


module.exports = {
    listGenre,
    addGenre,
    updateGenre,
    deleteGenre
}