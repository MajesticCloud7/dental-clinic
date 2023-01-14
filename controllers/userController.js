const express = require('express');
var router = express.Router()
const { User } = require("../models/baseUser.model");

router.get('/signIn', (req, res) => {
    res.render('user/signIn')
})

router.post('/signIn', (req, res) => {
    var error = ''

    User.findOne({ email: req.body.email }, (err, doc) => {
        if (doc == undefined) {
            error = 'Entered email does not exist.'
        } else if (doc.password != req.body.password) {
            error = 'Entered password is incorrect.'
        }

        if (error.length > 0) {
            res.render('user/signIn', {
                user: req.body,
                error: error
            })
        } else {
            res.redirect('/appointment/main/' + doc.id)
        }
    })
})

module.exports = router