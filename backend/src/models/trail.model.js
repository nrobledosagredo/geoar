import mongoose from "mongoose"

const trailSchema = new mongoose.Schema({
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

const getTrailModel = (language) => {
  const collectionName = language === "en" ? "trailsEN" : "trails"
  return mongoose.model("Trail", trailSchema, collectionName)
}

export default getTrailModel
