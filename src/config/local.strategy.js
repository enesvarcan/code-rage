var LocalStrategy = require('passport-local').Strategy
var User = require('../models/user.model')
var bcrypt = require('bcrypt')
var ErrorHandler = require('../helpers/error.handler')

module.exports = new LocalStrategy(
    function(username, password, done){
        User.findOne({username: username}, function (err, user) {

            if (err) {return done(new ErrorHandler(500, 'database_error'))}

            if (!user) {
                return done(null, false, new ErrorHandler(401, 'user_not_found'))
            }

           bcrypt.compare(password, user.password, (err, isMatch) => {
               
            if(err) return done(new ErrorHandler(500, 'internal_server_error'))

            if(!isMatch) return done(null, false, new ErrorHandler(401, 'wrong_password'))

            return done(null, user)
           })
        })
    }
)

