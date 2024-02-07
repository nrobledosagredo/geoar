import mongoose from "mongoose"
const { Schema } = mongoose

const pointSchema = new Schema({
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
      type: [Number], // [longitud, latitud]
      required: true,
    },
  },
})

const Point = mongoose.model("Point", pointSchema, "points");

export default Point;