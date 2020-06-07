var mongoose = require('mongoose')

var Schema = mongoose.Schema

var PostLikeSchema = new Schema({

    userId: {
        required: true,
        type: mongoose.Types.ObjectId
    },

    postId: {
        required: true,
        type: mongoose.Types.ObjectId
    },

    timestamp:{
        default: new Date(),
        type: Date
    }
})

PostLikeSchema.index({'userId': 1, 'postId': 1}, {unique: true})

module.exports = mongoose.model('PostLikes', PostLikeSchema)