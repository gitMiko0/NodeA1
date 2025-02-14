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
    const data = await genresController.getGenreById(req.params.id);
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

/**
 * GET /api/genres/painting/:id
 * Returns all genres used in a given painting, sorted by genreName
 */
router.get("/painting/:id", async (req, res) => {
  try {
    const data = await genresController.getGenresByPainting(req.params.id);
    if (!data.length) return res.status(404).json({ error: `No genres found for painting ID ${req.params.id}` });
    res.json(data);
  } catch (error) {
    console.error("Error fetching genres for painting:", error);
    res.status(500).json({ error: "Failed to fetch genres" });
  }
});



export default router;
