const express = require('express')
var router = express.Router()
const { Doctor } = require("../models/doctor.model");
const { User } = require("../models/baseUser.model");

router.get('/signUp', (req, res) => {
    res.render('doctor/signUp')
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
                res.render('doctor/signUp', {
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
    var doctor = new Doctor();
    doctor.firstName = req.body.firstName;
    doctor.lastName = req.body.lastName;
    doctor.email = req.body.email;
    doctor.specialty = req.body.specialty;
    doctor.password = req.body.password;

    doctor.save((err, doc) => {
        if (!err) {
            res.redirect('/')
        } else {
            console.log('Error during insert: ' + err)
        }
    });
}

module.exports = router