const mongoose = require('mongoose')

mongoose.connect('mongodb://127.0.0.1:27017/dental_clinic_db', {
    useNewUrlParser: true
},
    err => {
        if (err) {
            console.log('Error in database connection: ' + err)
        } else {
            console.log('Database connection successful')
        }
    })