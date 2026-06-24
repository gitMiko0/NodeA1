import express from "express";
import cors from "cors";
import fs from "fs";

const app = express();
const port = process.env.PORT || 3000;

const allowedOrigins = [
  "http://localhost:5173",
  "https://elysiana.vercel.app",
  "https://elysianabackend.vercel.app"
];

// Enable CORS for all routes
app.use(cors({
  origin: allowedOrigins, // MUST contain the frontend host url
  methods: 'GET, POST, PUT, DELETE, OPTIONS',
  allowedHeaders: 'Content-Type, Authorization',
  
  credentials: true,
}));

// Ensure UTF-8 encoding for all responses
app.use((req, res, next) => {
  res.setHeader("Content-Type", "application/json; charset=utf-8");
  next();
});

app.set("json spaces", 2); // Enable JSON pretty printing
app.use(express.json({ limit: "10mb", type: "application/json; charset=utf-8" }));

// Modularized Routes
import artistsRoutes from "./routes/artists.js";
import galleriesRoutes from "./routes/galleries.js";
import paintingsRoutes from "./routes/paintings.js";
import genresRoutes from "./routes/genres.js";
import erasRoutes from "./routes/eras.js";
import countsRoutes from "./routes/counts.js";

app.use("/api/artists", artistsRoutes);
app.use("/api/galleries", galleriesRoutes);
app.use("/api/paintings", paintingsRoutes);
app.use("/api/genres", genresRoutes);
app.use("/api/eras", erasRoutes);
app.use("/api/counts", countsRoutes);

// A lightweight route just to ping the database
router.get('/keep-alive', async (req, res) => {
  try {
    // A tiny query just to prove we are active
    const { error } = await supabase.from('eras').select('eraId').limit(1);
    
    if (error) throw error;
    res.status(200).send("Supabase is awake!");
  } catch (err) {
    res.status(500).send("Failed to ping database");
  }
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});

