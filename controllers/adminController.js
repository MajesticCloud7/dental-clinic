const express = require('express');
var router = express.Router()
const { Admin } = require("../models/admin.model");
const { User } = require("../models/baseUser.model");

router.get('/signUp', (req, res) => {
    res.render('admin/signUp')
})

router.post('/signUp', (req, res) => {
    if (req.body._id == '') {
        var error = ''

        User.find({ email: req.body.email }, (err, docs) => {
            if (docs.length > 0) {
                error += 'Entered email already exists.\n'
            }
            if (req.body.password != req.body.repeatedPassword) {
                error += 'Entered passwords do not match.'
            }
            if (error.length > 0) {
                res.render('admin/signUp', {
                    user: req.body,
                    error: error
                })
            } else {
                insertRecord(req, res)
            }
        })
    }
})

function insertRecord(req, res) {
    var admin = new Admin();
    admin.firstName = req.body.firstName;
    admin.lastName = req.body.lastName;
    admin.email = req.body.email;
    admin.password = req.body.password;

    admin.save((err, doc) => {
        if (!err) {
            res.redirect('/')
        } else {
            console.log('Error during insert: ' + err)
        }
    });
}

module.exports = router