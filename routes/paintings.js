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

router.get("/artist/:id", async (req, res) => {
  try {
    const data = await paintingsController.getPaintingsByArtist(req.params.id);
    res.json(data);
  } catch (error) {
    res.status(400).json({ error: error.message });
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
export default router;
