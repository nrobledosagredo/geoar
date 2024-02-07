import mongoose from "mongoose"

const { Schema } = mongoose

const treeSchema = new Schema({
  _id: mongoose.Schema.Types.ObjectId,
  name: {
    type: String,
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
  treeCard: {
    type: mongoose.Schema.Types.ObjectId,
    required: false,
  },
  habilitado: {
    type: Boolean,
    required: true,
  },
  updatedAt: {
    type: Date,
    required: true,
  },
})

const Tree = mongoose.model("Tree", treeSchema, "trees")

export default Tree
