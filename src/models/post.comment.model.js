var mongoose = require('mongoose')

var Schema = mongoose.Schema

var PostCommentSchema = new Schema({

    userId: {
        required: true,
        type: mongoose.Types.ObjectId
    },

    postId: {
        required: true,
        type: mongoose.Types.ObjectId
    },

    comment: {
        required: true,
        type: String
    },

    timestamp:{
        default: new Date(),
        type: Date
    }
})

PostCommentSchema.index({'userId': 1, 'postId': 1}, {unique: true})

module.exports = mongoose.model('PostComment', PostCommentSchema)