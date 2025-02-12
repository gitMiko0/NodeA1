import express from "express";
import * as erasController from "../controllers/erasController.js";

const router = express.Router();

router.get("/", async (req, res) => {
  try {
    const data = await erasController.getAllEras();
    res.json(data);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

export default router;