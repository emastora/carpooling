const mongoose = require('mongoose');

const journeySchema = new mongoose.Schema({
    local: {
        oid: Number,
        vehicle: Number,
        driver: String,
        mode: String,
        departureAddress: Number,
        departureLat: Number,
        departureLng: Number,
        destinationAddress: Number,
        destinationLat: Number,
        destinationLng: Number,
        schedule: Number,
        distance: Number,
        journeyDuration: Number,
        acceptedPassengers: Number,
        pendingPassengers: Number,
        rejectedPassengers: Number,
        waypoints: Array,
        seatsAvailable: Number,
        notes: String
    }
}, { versionKey: false });

// create the model for journey and expose it to our app
module.exports = mongoose.model('Journey', journeySchema);