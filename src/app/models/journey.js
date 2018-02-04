const mongoose = require('mongoose');

const journeySchema = new mongoose.Schema({
    local: {
        departAddress: String,
        departLet: String,
        departLng: String,
        destinAddress: String,
        destinLet: String,
        destinLng: String,
        time: String,
        date: String,
        distance: String,
        duration: String
    }
});


// create the model for user and expose it to our app
module.exports = mongoose.model('Journey', journeyrSchema);