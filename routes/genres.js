import express from "express";
import * as genresController from "../controllers/genresController.js";

const router = express.Router();

router.get("/", async (req, res) => {
  try {
    const data = await genresController.getAllGenres();
    res.json(data);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

router.get("/:id", async (req, res) => {
  try {
    const data = await genresController.getPaintingsByGenre(req.params.id);
    res.json(data);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

router.get("/counts", async (req, res) => {
  try {
    const data = await genresController.getGenreCounts();
    res.json(data);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

router.get("/artists/counts", async (req, res) => {
  try {
    const data = await genresController.getArtistCounts();
    res.json(data);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

export default router;
