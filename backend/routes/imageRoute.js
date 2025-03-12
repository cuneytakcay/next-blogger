import express from 'express';
import ImageKit from 'imagekit';
import multer from 'multer';

const router = express.Router();

// Initialize ImageKit
const imagekit = new ImageKit({
  publicKey: process.env.IMAGEKIT_PUBLIC_KEY,
  privateKey: process.env.IMAGEKIT_PRIVATE_KEY,
  urlEndpoint: process.env.IMAGEKIT_URL_ENDPOINT,
});

// Setup Multer (for file handling)
const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

// Post image
// POST /api/images/upload
router.post('/upload', upload.single('image'), async (req, res) => {
  try {
    const file = req.file;

    // Upload image to ImageKit
    const response = await imagekit.upload({
      file: file.buffer,
      fileName: file.originalname,
    });

    res.status(200).json({ url: response.url });
  } catch (error) {
    console.error('Error uploading image to ImageKit:', error);
    res.status(500).json({ error: 'Image upload failed' });
  }
});

export default router;
