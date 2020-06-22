const mongoose = require('mongoose')
const path = require('path')

var Schema = mongoose.Schema

var UserProfileSchema = new Schema({

    userId: {
        required: true,
        unique: true,
        type: mongoose.Types.ObjectId
    },

    email: {
        required: true,
        type: String
    },

    name: {
        type: String
    },

    profilePicture: {
        //Pictures are stored in the file system, this shows the path to the picture
        type: String
    },

    interestedIn: {
        type: String
    },
    
    bio: {
        type: String
    },

    timestamp:{
        default: new Date(),
        type: Date
    }
})

module.exports = mongoose.model('UserProfile', UserProfileSchema)