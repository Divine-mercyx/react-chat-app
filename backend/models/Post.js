const mongoose = require('mongoose')

const PostSchema = mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'User'
    },

    title: {
        type: String,
        required: true
    },

    image: {
        type: String,
        required: true
    }
},
    { timestamps: true }
);

module.exports = mongoose.model('Post', PostSchema);