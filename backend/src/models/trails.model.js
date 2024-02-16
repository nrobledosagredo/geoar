import mongoose from "mongoose"

const { Schema } = mongoose

const trailSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  distance: {
    value: Number,
    unit: String,
  },
  duration: {
    value: Number,
    unit: String,
  },
  difficulty: {
    type: String,
    required: true,
  },
  infoCards: [
    {
      _id: mongoose.Schema.Types.ObjectId,
      order: Number,
    },
  ],
})

const getTrailModel = (lang) => {
  const collectionName = lang === "en" ? "trailsEN" : "trails"
  const Trail = mongoose.model("Trail", trailSchema, collectionName)
  return Trail
}

export default getTrailModel
