import mongoose from "mongoose"

const { Schema } = mongoose

const infoCardSchema = new Schema({
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
  const InfoCard = mongoose.model("InfoCard", infoCardSchema, collectionName)
  return InfoCard
}

export default getInfoCardModel
