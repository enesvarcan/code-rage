const mongoose = require('mongoose')

var Schema = mongoose.Schema

var PostSchema = new Schema({

    userId: {
        required: true,
        type: mongoose.Types.ObjectId
    },

    header: {
        required: true,
        type: String
    },

    text: {
        required: true,
        type: String
    },

    picture: {
        //E: path to the picture
        type: String
    },

    keywords: {
        //E: array of keywords
        type: Array
    },

    timestamp:{
        default: new Date(),
        type: Date
    }
})

module.exports = mongoose.model('Post', PostSchema)