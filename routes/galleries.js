import express from "express";
import * as galleriesController from "../controllers/galleriesController.js";

const router = express.Router();

router.get("/", async (req, res) => {
  try {
    const data = await galleriesController.getAllGalleries();
    res.json(data);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

router.get("/:id", async (req, res) => {
  try {
    const data = await galleriesController.getGalleryById(req.params.id);
    res.json(data);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

router.get("/country/:substring", async (req, res) => {
  try {
    const data = await galleriesController.getGalleriesByCountry(req.params.substring);
    res.json(data);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

export default router;
