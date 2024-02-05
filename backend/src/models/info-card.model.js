import mongoose from "mongoose"

const dataSchema = new mongoose.Schema({
  name: {
    required: true,
    type: String,
  },
  description: {
    type: String,
    required: true,
  },
  images: {
    type: [String],
    required: true,
  },
  geometry: {
    type: {
      type: String,
      enum: ["Point"],
      required: true,
    },
    coordinates: {
      type: [Number],
      required: true,
    },
  },
})

const getInfoCardModel = (language) => {
  const collectionName = language === "en" ? "infoCardsEN" : "infoCards"
  return mongoose.model("InfoCard", dataSchema, collectionName)
}

export default getInfoCardModel
