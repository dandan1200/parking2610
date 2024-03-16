const mongoose = require('mongoose');

const parkingLotSchema = new mongoose.Schema({
    lot_type: String,
    lot_name: String,
    lot_number: String,
    total_spaces: String,
    availability_monday: Map,
    availability_tuesday: Map,
    availability_wednesday: Map,
    availability_thursday: Map,
    availability_friday: Map
  });

module.exports = mongoose.model('parking_data', parkingLotSchema);