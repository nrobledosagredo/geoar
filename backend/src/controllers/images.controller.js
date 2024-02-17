// images.controller.js
import axios from 'axios';

export const getImage = async (req, res) => {
  const imageUrl = req.query.url;
  if (!imageUrl) {
    return res.status(400).json({ message: 'URL is required' });
  }

  try {
    const response = await axios.get(imageUrl, { responseType: 'arraybuffer' });
    const imageBuffer = Buffer.from(response.data, 'binary');
    const contentType = response.headers['content-type'];
    res.setHeader('Content-Type', contentType);
    res.send(imageBuffer);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching image' });
  }
};