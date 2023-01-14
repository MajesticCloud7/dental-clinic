require('./models/db')

const express = require('express')
const path = require('path')
const handlebars = require('handlebars')
const exphbs = require('express-handlebars')
const { allowInsecurePrototypeAccess } = require('@handlebars/allow-prototype-access')
const bodyparser = require('body-parser')

const adminController = require('./controllers/adminController')
const doctorController = require('./controllers/doctorController')
const patientController = require('./controllers/patientController')
const userController = require('./controllers/userController')
const appointmentController = require('./controllers/appointmentController')

var app = express()

app.use(bodyparser.urlencoded({ extended: false }))
app.use(bodyparser.json())

app.get("/", (req, res) => {
    res.render('layouts/indexLayout', { layout: false })
})

app.set('views', path.join(__dirname, '/views/'))

app.engine('hbs', exphbs.engine({
    handlebars: allowInsecurePrototypeAccess(handlebars),
    extname: 'hbs',
    defaultLayout: 'indexLayout',
    layoutDir: __dirname + '/views/layouts/',
    helpers: {
        ifEquals(arg1, arg2, options) {
            return (arg1 == arg2) ? options.fn(this) : options.inverse(this);
        }
    }
}))

app.set('view engine', 'hbs')

app.listen(3000, () => {
    console.log('Server started on port 3000')
})

app.use('/admin', adminController)
app.use('/doctor', doctorController)
app.use('/patient', patientController)
app.use('/user', userController)
app.use('/appointment', appointmentController)