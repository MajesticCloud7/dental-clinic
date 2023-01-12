const express = require('express')
var router = express.Router()
const { Patient } = require("../models/patient.model");
const { User } = require("../models/baseUser.model");

router.get('/signUp', (req, res) => {
    res.render('patient/signUp')
})

router.post('/signUp', (req, res) => {
    if (req.body._id == '') {
        var error = ''

        User.find({ email: req.body.email }, (err, sameEmailDocs) => {
            Patient.find({ personalCode: req.body.personalCode }, (err, sameCodeDocs) => {
                if (sameEmailDocs.length > 0) {
                    error += 'Entered email already exists.\n'
                }
                if (sameCodeDocs.length > 0) {
                    error += 'Entered personal code already exists.\n'
                }
                if (req.body.personalCode.length != 11 || req.body.personalCode.match(/^[0-9]+$/) == null) {
                    error += 'Personal code must consist of 11 digits.\n'
                }
                if (req.body.password != req.body.repeatedPassword) {
                    error += 'Entered passwords do not match.'
                }

                if (error.length > 0) {
                    res.render('patient/signUp', {
                        user: req.body,
                        error: error
                    })
                } else {
                    insertRecord(req, res)
                }
            })
        })
    }
})

function insertRecord(req, res) {
    var patient = new Patient();
    patient.firstName = req.body.firstName;
    patient.lastName = req.body.lastName;
    patient.email = req.body.email;
    patient.personalCode = req.body.personalCode;
    patient.password = req.body.password;

    patient.save((err, doc) => {
        if (!err) {
            res.redirect('/')
        } else {
            console.log('Error during insert: ' + err)
        }
    });
}

module.exports = router