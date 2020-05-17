var mongoose = require('mongoose')

var Schema = mongoose.Schema

var PostLikesSchema = new Schema({

    user: {
        required: true,
        type: mongoose.Types.ObjectId
    },

    post: {
        required: true,
        type: mongoose.Types.ObjectId
    },

    timestamp:{
        default: new Date(),
        type: Date
    }
})

PostLikesSchema.index({'user': 1, 'post': 1}, {unique: true})

module.exports = mongoose.model('PostLikes', PostLikesSchema)