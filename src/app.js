//Definitions
const express = require('express')
const session = require('express-session')
const mongoose = require('mongoose')
const passport = require('passport')
const cors = require('cors')
const bodyParser = require('body-parser')
const path = require('path')
const CONNSTR = require('./config/db.connection')
const PORT = require('./config/server.port')
const passportConfig = require('./config/passport')
const app = express()

//Configuration: express-session
app.use(session({secret: 'b4dc0d3', resave: false, saveUninitialized: true}))
//Configuration: passport
require('./config/passport')(app)
//Configuration: body-parser
app.use(bodyParser.urlencoded({extended: true}))
app.use(bodyParser.json())
//Configuration: cors
app.use(cors())
//Configuration: express-static
app.use(express.static(path.join(__dirname, '..', 'public')))
//Configuration: errorHandler
//app.use('*', require('./services/errorhandler.mw').errorHandler)
//Configuration: routers
require('./routes/main.router')(app)
require('./routes/page.router')(app)


mongoose.set('useNewUrlParser', true)
mongoose.set('useFindAndModify', false)
mongoose.set('useCreateIndex', true)
mongoose.set('useUnifiedTopology', true)

mongoose.connect(CONNSTR)
    .then(() => {
        console.log('Succesfully connected to DB...')
        
    }).catch((err) => {
        console.log(err)
    })

app.listen(PORT, () => {
    console.log(`Listening on port -> ${PORT}`)
})