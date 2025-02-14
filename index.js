// index.js - Main server setup
import express from "express";
import cors from "cors";
import { createClient } from "@supabase/supabase-js";

const app = express();
const port = process.env.PORT || 3000;

// Enable automatic JSON pretty printing
app.set("json spaces", 2);
app.use(cors());
app.use(express.json());

import artistsRoutes from "./routes/artists.js";
import galleriesRoutes from "./routes/galleries.js";
import paintingsRoutes from "./routes/paintings.js";
import genresRoutes from "./routes/genres.js";
import erasRoutes from "./routes/eras.js"

// Modularized Routes
app.use("/api/artists", artistsRoutes);
app.use("/api/galleries", galleriesRoutes);
app.use("/api/paintings", paintingsRoutes);
app.use("/api/genres", genresRoutes);
app.use("/api/eras", erasRoutes);

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});

