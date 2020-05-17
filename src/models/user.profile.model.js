const mongoose = require('mongoose')

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
        //E: pictures are stored in file system, this shows the path to the picture
        type: String
    },

    interestedIn: {
        type: String
    },
    
    bio: {
        type: String
    },

    isNewUser: {
        //E: is this first login?
        type: Boolean,
        default: true
    },

    timestamp:{
        default: new Date(),
        type: Date
    }
})

module.exports = mongoose.model('UserProfile', UserProfileSchema)