const mongoose = require('mongoose');

const ReviewsSchema = new mongoose.Schema({
    title: {
        type: String,
        require: true,
        trim: true
    },
    body: {
        type: String,
        require: true,
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
    },
    status: {
        type: String,
        default: 'public',
    }
});

module.exports = mongoose.model('Reviews', ReviewsSchema);