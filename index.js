require('./models/db')

const express = require('express')
const path = require('path')
const handlebars = require('handlebars')
const exphbs = require('express-handlebars')
const { allowInsecurePrototypeAccess } = require('@handlebars/allow-prototype-access')
const bodyparser = require('body-parser')

var app = express()

app.use(bodyparser.urlencoded({ extended: false }))
app.use(bodyparser.json())

app.get("/", (req, res) => {
    res.render('layouts/indexLayout')
})

app.set('views', path.join(__dirname, '/views/'))

app.engine('hbs', exphbs.engine({
    handlebars: allowInsecurePrototypeAccess(handlebars),
    extname: 'hbs',
    defaultLayout: 'indexLayout',
    layoutDir: __dirname + '/views/layouts/'
}))

app.set('view engine', 'hbs')

app.listen(3000, () => {
    console.log('Server started on port 3000')
})