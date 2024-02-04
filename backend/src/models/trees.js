const mongoose = require('mongoose');

const treeSchema = new mongoose.Schema({
  _id: mongoose.Schema.Types.ObjectId,
  name: {
    type: String,
    required: true
  },
  geometry: {
    type: {
      type: String,
      enum: ['Point'],
      required: true
    },
    coordinates: {
      type: [Number], // [longitude, latitude]
      required: true
    }
  },
  treeCard: {
    type: mongoose.Schema.Types.ObjectId,
    required: false
  },
  habilitado: {
    type: Boolean,
    required: true
  },
  updatedAt: {
    type: Date,
    required: true
  }
});

module.exports = mongoose.model('Tree', treeSchema, 'trees');
