import mongoose from "mongoose"

const pointSchema = new mongoose.Schema({
  trailId: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
  },
  order: {
    type: Number,
    required: true,
  },
  geometry: {
    type: {
      type: String,
      enum: ["Point"],
      required: true,
    },
    coordinates: {
      type: [Number], // [longitude, latitude]
      required: true,
    },
  },
})

export default mongoose.model("Point", pointSchema, "points")
