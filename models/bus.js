const mongoose = require("mongoose");

const busSchema = new mongoose.Schema({
  yatayat: {
    type: String,
    required: true,
  },
  start_point: {
    type: String,
    required: true,
  },
  end_point: {
    type: String,
    required: true,
  },
  intermediate_destinations: {
    type: [String],
    required: true,
  },
});

const Bus = mongoose.model("bus", busSchema);

module.exports = Bus;
