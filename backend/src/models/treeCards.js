const mongoose = require('mongoose');

const treeCardSchema = new mongoose.Schema({
  _id: mongoose.Schema.Types.ObjectId,
  images: [String],
  commonName: [String],
  binomialName: {
    type: String,
    required: true
  },
  taxonomy: {
    kingdom: String,
    division: String,
    class: String,
    order: String,
    family: String,
    genus: String,
    species: String
  },
  conservationStatus: {
    acronym: String,
    description: String
  },
  isNative: {
    type: Boolean,
    required: true
  },
  origin: [String],
  sector: [String],
  classification: [String],
  annexes: [String],
  representative: {
    _id: mongoose.Schema.Types.ObjectId,
    name: String,
    geometry: {
      type: {
        type: String,
        enum: ['Point'],
        required: true
      },
      coordinates: {
        type: [Number],
        required: true
      }
    },
    treeCard: mongoose.Schema.Types.ObjectId
  }
});

module.exports = mongoose.model('TreeCard', treeCardSchema, 'treeCards');
