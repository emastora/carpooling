const mongoose = require('mongoose');

const vehicleSchema = new mongoose.Schema(
  {
    local: {
<<<<<<< HEAD
        owner: String,
        brand: String,
        model: String,
        seats: String,
        color: String,
        licencePlate: String,
        year: String,
        cc: String,
        aircondition: String,
        petsAllowed: String
=======
      brand: String,
      model: String,
      seats: String,
      color: String,
      licencePlate: String,
      year: String,
      cc: String,
      aircondition: String,
      petsAllowed: String
>>>>>>> 62c1fe32da3831e18a6c5dc455ecc26d5a2f73ca
    }
  },
  { versionKey: false }
);

// create the model for vehicle and expose it to our app
module.exports = mongoose.model('Car', vehicleSchema);