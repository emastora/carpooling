const mongoose = require('mongoose');

const ratingSchema = new mongoose.Schema({
    local: {
        oid: Number,
        from: String,
        to: String,
        rating: Number,
    }
}, { versionKey: false });

// create the model for journey and expose it to our app
module.exports = mongoose.model('Rating', ratingSchema);