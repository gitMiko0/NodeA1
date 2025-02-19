// routes/countsRoutes.js
import express from "express";
import * as countsController from "../controllers/countsController.js";

const router = express.Router();

// Implemented in Suapbase SQL editor due to errors regarding aggregate functions that are required for these queries.
router.get("/genres", countsController.getGenreCounts); 
router.get("/artists", countsController.getArtistCounts); 
router.get("/topgenres/:ref", countsController.getTopGenres);

export default router;
