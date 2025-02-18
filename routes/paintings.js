// paintingsRoutes.js

import express from "express";
import * as paintingsController from "../controllers/paintingsController.js";

const router = express.Router();

router.get("/", async (req, res) => {
  try {
    const data = await paintingsController.getAllPaintings();
    res.json(data);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

router.get("/:id", async (req, res) => {
  try {
    const data = await paintingsController.getPaintingById(req.params.id);
    res.json(data);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// Get paintings from a specific gallery
router.get("/galleries/:id", async (req, res) => {
  try {
    const data = await paintingsController.getPaintingsByGallery(req.params.id);
    if (!data.length) return res.status(404).json({ error: "No paintings found for this gallery" });
    res.json(data);
  } catch (error) {
    console.error("Error fetching paintings by gallery:", error);
    res.status(500).json({ error: "Failed to fetch paintings" });
  }
});


router.get("/years/:start/:end", async (req, res) => {
  try {
    const data = await paintingsController.getPaintingsByYearRange(req.params.start, req.params.end);
    res.json(data);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

router.get("/galleries/:id", async (req, res) => {
  try {
    const data = await paintingsController.getPaintingsByGallery(req.params.id);
    res.json(data);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

router.get("/sort/:sortBy?", async (req, res) => {
  try {
    const sortBy = req.params.sortBy || "year"; // Default to 'year' if not provided
    const data = await paintingsController.getPaintingsSorted(sortBy);
    res.json(data);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

router.get("/search/:substring", async (req, res) => {
  try {
    const data = await paintingsController.searchPaintingsByTitle(req.params.substring);
    res.json(data);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// Get paintings by a specific artist
router.get("/artist/:id", async (req, res) => {
  try {
    const data = await paintingsController.getPaintingsByArtist(req.params.id);
    if (!data.length) return res.status(404).json({ error: "No paintings found for this artist" });
    res.json(data);
  } catch (error) {
    console.error("Error fetching paintings by artist:", error);
    res.status(500).json({ error: "Failed to fetch paintings" });
  }
});

// Get paintings by artists of a certain nationality
router.get("/artists/country/:substring", async (req, res) => {
  try {
    const data = await paintingsController.getPaintingsByArtistNationality(req.params.substring);
    if (!data.length) return res.status(404).json({ error: "No paintings found for this nationality" });
    res.json(data);
  } catch (error) {
    console.error("Error fetching paintings by artist nationality:", error);
    res.status(500).json({ error: "Failed to fetch paintings" });
  }
});

/*
 * GET /api/paintings/genre/:id
 * Returns all paintings for a given genre, sorted by yearOfWork
 */
router.get("/genre/:id", async (req, res) => {
  try {
    const data = await paintingsController.getPaintingsByGenre(req.params.id);
    if (!data.length) return res.status(404).json({ error: `No paintings found for genre ID ${req.params.id}` });
    res.json(data);
  } catch (error) {
    console.error("Error fetching paintings for genre:", error);
    res.status(500).json({ error: error.message || "Failed to fetch paintings" });
  }
});

/*
 *  GET /api/paintings/era/:givenId
 *  Returns all paintings for a given era (using eraId)
 *  Only returns the firelds paintingId, title, and yearOfWork.
 *  Sorted by yearOfWork
 */
router.get("/era/:id", async (req, res) => {
  try {
    const data = await paintingsController.getPaintingsByEra(req.params.id);
    if (!data.length) return res.status(404).json({ error: `No paintings found for genre ID ${req.params.id}` });
    res.json(data);
  } catch (error) {
    console.error("Error fetching paintings for genre:", error);
    res.status(500).json({ error: error.message || "Failed to fetch paintings" });
  }
});

export default router;
