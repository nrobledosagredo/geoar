// interactions.model.js
import mongoose from 'mongoose';

const { Schema } = mongoose;

const interactionSchema = new Schema(
  {
    userId: {
      type: String,
      required: true,
    },
    trailId: {
      type: String,
      required: true,
    },
    cardId: {
      type: String,
      required: true,
    },
    cardType: {
      type: String,
      required: true,
      enum: ['treeCard', 'infoCard'],
    },
    geometry: {
      type: {
        type: String,
        enum: ["Point"],
        required: true,
      },
      coordinates: {
        type: [Number], // [longitud, latitud]
        required: true,
      },
    },
  },
  { versionKey: false }
)

const Interaction = mongoose.model('Interaction', interactionSchema, 'interactions');

export default Interaction;
