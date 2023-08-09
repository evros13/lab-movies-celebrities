const router = require("express").Router();
const Movie = require('../models/Movie.model.js');
const Celebrity = require('../models/Celebrity.model.js');


// all your routes here


router.get("/movies", (req, res, next) => {
    Movie.find()
        .then((moviesFromDB) => {
            res.render("movies/movies.hbs", {moviesFromDB})
        })
        .catch((err) => {
            next(err)
        })
})


router.get("/movies/create", (req, res) => {
    res.render("movies/new-movie")
})


router.post("/movies/create", (req, res, next) => {
    const newMovie = {
        title: req.body.title,
        genre: req.body.genre,
        plot: req.body.plot,
        cast: req.body.cast
    }

    Movie.create(newMovie)
        .then(() => res.redirect(`/movies`))
        .catch((err) => next(err))

})

router.get('/movies/:movieId', (req, res, next) => {
    const movieId = req.params.movieId
    Movie.findById(movieId)
        .then(theMovie => res.render('movies/movie-details.hbs', theMovie))
        .catch(error => {
            console.log('Error while retrieving movie details');
            next(error);
        })
})

module.exports = router;