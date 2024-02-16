import mongoose from "mongoose"

const { Schema } = mongoose

const userSchema = new Schema(
  {
    userId: {
      type: String,
      required: true,
    },
    dob: {
      type: Date,
    },
    ageRange: {
      type: String,
      enum: ["0-18", "19-30", "31-45", "46-60", "61+"],
    },
    disabilities: {
      type: [String],
      default: [],
    },
    language: {
      type: String,
      required: true,
    },
  },
  { versionKey: false }
)

const User = mongoose.model("User", userSchema, "users")

export default User
