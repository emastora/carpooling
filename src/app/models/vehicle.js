const mongoose = require('mongoose');

const vehicleSchema = new mongoose.Schema({
    local: {
        brand: String,
        departLet: String,
        model: String,
        noofseats: String,
        color: String,
        destinLng: String,
        year: String,
        air_condition: String,
        licencePlate: String
    }
});


// create the model for user and expose it to our app
module.exports = mongoose.model('Vehicle', vehicleSchema);