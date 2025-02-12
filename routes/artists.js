// artists.js
import express from "express";
import * as artistsController from "../controllers/artistsController.js";

const router = express.Router();

router.get("/", async (req, res) => {
  try {
    const data = await artistsController.getAllArtists();
    res.json(data);
  } catch (error) {
    console.error("Error fetching all artists:", error); // Log the error
    res.status(500).json({ error: "Failed to fetch artists" }); // Send a 500 error
  }
});

router.get("/:id", async (req, res) => {
  try {
    const data = await artistsController.getArtistById(req.params.id);
    if (data) {
      res.json(data);
    } else {
      res.status(404).json({ error: "Artist not found" }); // Handle "Not Found"
    }
  } catch (error) {
    console.error("Error fetching artist by ID:", error);
    res.status(500).json({ error: "Failed to fetch artist" });
  }
});

router.get("/search/:substring", async (req, res) => {
  try {
    const data = await artistsController.searchArtistsByName(req.params.substring);
    res.json(data);  // Even if it's an empty array, send it (means "no results")
  } catch (error) {
    console.error("Error searching artists by name:", error);
    res.status(500).json({ error: "Failed to search artists" });
  }
});

router.get("/country/:substring", async (req, res) => {
  try {
    const data = await artistsController.searchArtistsByCountry(req.params.substring);
    res.json(data); // Even if it's an empty array, send it (means "no results")
  } catch (error) {
    console.error("Error searching artists by country:", error);
    res.status(500).json({ error: "Failed to search artists" });
  }
});

export default router;
