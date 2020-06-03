var LocalStrategy = require('passport-local').Strategy
var User = require('../models/user.model')
var bcrypt = require('bcrypt')

module.exports = new LocalStrategy(
    function(username, password, done){
        User.findOne({username: username}, function (err, user) {

            if (err) {return done(err)}

            if (!user) {
                return done(null, false, {message: 'User not found.'})
            }

           bcrypt.compare(password, user.password, (err, isMatch) => {
               
            if(err) return done(err)

            if(!isMatch) return done(null, false, {message: 'Wrong password.'})

            return done(null, user)
           })
        })
    }
)

