const mongoose = require('mongoose')

var Schema = mongoose.Schema

var CommentSchema = new Schema({

    userId: {
        required: true,
        type: mongoose.Types.ObjectId
    },

    postId: {
        required: true,
        type: mongoose.Types.ObjectId
    },

    text: {
        required: true,
        type: String
    },

    timestamp:{
        default: new Date(),
        type: Date
    }
})

module.exports = mongoose.model('Comment', CommentSchema)