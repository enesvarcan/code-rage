var mongoose = require('mongoose')

var Schema = mongoose.Schema

var PostCommentSchema = new Schema({

    user: {
        required: true,
        type: mongoose.Types.ObjectId
    },

    comment: {
        required: true,
        type: mongoose.Types.ObjectId
    },

    timestamp:{
        default: new Date(),
        type: Date
    }
})

PostCommentSchema.index({'user': 1, 'comment': 1}, {unique: true})

module.exports = mongoose.model('PostComment', PostCommentSchema)