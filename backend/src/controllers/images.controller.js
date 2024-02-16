// images.controller.js
import axios from "axios"

export async function getImages(req, res) {
  const imageUrl = req.query.url

  if (!imageUrl) {
    return res.status(400).send("No image URL provided")
  }

  try {
    const response = await axios.get(imageUrl, { responseType: "stream" })

    if (response.headers["content-type"]) {
      res.setHeader("Content-Type", response.headers["content-type"])
    }

    response.data.pipe(res)
  } catch (error) {
    console.error(error)
    res.status(500).send("Error fetching image")
  }
}
