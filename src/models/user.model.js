const mongoose = require('mongoose')
const bcrypt = require('bcrypt')

var Schema = mongoose.Schema

var UserSchema = new Schema({

    username: {
        type: String,
        required: true,
        unique: true
    },

    password: {
        type: String,
        required: true
    },

    email: {
        type: String,
        required: true
    },

    hasProfile: {
        type: Boolean,
        default: false
    }
})

UserSchema.pre('save', function (next){

    var user = this

    if(!user.isModified('password')){
        return next
    } else {
        bcrypt.genSalt(10, (err, salt) => {
            if (err) return next(err)
            bcrypt.hash(user.password, salt, (err, hash) => {
                if(err) return next(err)

                user.password = hash
                next()
            })
        })
    }
})

module.exports = mongoose.model('User', UserSchema)