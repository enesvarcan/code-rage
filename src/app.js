//Definitions
const express = require('express')
const session = require('express-session')
const fileUpload = require('express-fileupload')
const mongoose = require('mongoose')
const cors = require('cors')
const bodyParser = require('body-parser')
const path = require('path')
const app = express()

//Configuration: dotenv
require('dotenv').config({path: path.join(__dirname, '../.env')})
//Configuration: express-session
app.use(session({secret: process.env.SECRET, resave: false, saveUninitialized: true}))
//Configuration: passport
require('./config/passport')(app)
//Configuration: body-parser
app.use(bodyParser.urlencoded({extended: true}))
app.use(bodyParser.json())
//Configuration: cors
app.use(cors())
//Configuration: express-static
app.use('/public', express.static(path.join(__dirname, '../public')))
app.use('/uploads', express.static(path.join(__dirname, '../uploads')))
//Configuration: express-fileupload
app.use(fileUpload())
//Configuration: routers
app.use(require('./routes/auth.router'))
app.use(require('./routes/main.router'))
//Configuration: error handler
require('./controllers/error.controller')(app)
//Configuration: ejs
app.set('views', path.join(__dirname, '../views'))
app.set('view engine', 'ejs')

mongoose.set('useNewUrlParser', true)
mongoose.set('useFindAndModify', false)
mongoose.set('useCreateIndex', true)
mongoose.set('useUnifiedTopology', true)

mongoose.connect(process.env.CONNSTR)
    .then(() => {
        console.log('Succesfully connected to DB...')
        
    }).catch((err) => {
        console.log(err)
    })

app.listen(process.env.PORT, () => {
    console.log(`Listening on port -> ${process.env.PORT}`)
})