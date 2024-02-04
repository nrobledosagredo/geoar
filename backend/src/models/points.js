const mongoose = require('mongoose');

const pointSchema = new mongoose.Schema({
    trailId: {
        type: mongoose.Schema.Types.ObjectId,
        required: true
    },
    order: {
        type: Number,
        required: true
    },
    geometry: {
        type: {
            type: String,
            enum: ["Point"],
            required: true
        },
        coordinates: {
            type: [Number], // [longitude, latitude]
            required: true
        }
    }
});

module.exports = mongoose.model('Point', pointSchema, 'points');
