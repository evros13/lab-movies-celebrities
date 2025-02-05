const router = require("express").Router();
const Celebrity = require('../models/Celebrity.model.js');

// all your routes here

router.get("/celebrities", (req, res, next) => {
    Celebrity.find()
        .then((celebritiesFromDB) => {
            res.render('celebrities/celebrities.hbs', {celebritiesFromDB});
        })
        .catch(error => {
            next(error);
        });
});


router.get("/celebrities/create", (req, res) => {
    res.render("celebrities/new-celebrity")
})

router.post("/celebrities/create", (req, res, next) => {
    const newCelebrity = {
        name: req.body.name,
        occupation: req.body.occupation,
        catchPhrase: req.body.catchPhrase
    }

    Celebrity.create(newCelebrity)
        .then(() => res.redirect(`/celebrities`))
        .catch((err) => {
            // res.render("/celebrities/new-celebrity")
            next(err)
        })

})






module.exports = router;