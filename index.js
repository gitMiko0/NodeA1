// index.js - Main server setup
import express from "express";

const app = express();
const port = process.env.PORT || 3000;

app.set("json spaces", 2); // Enable automatic JSON pretty printing
app.use(express.json());


/*
Error-handling docs:
400	Bad Request	Client-side errors (e.g., invalid input, malformed requests).
500	Internal Server Error	Unexpected server-side errors (e.g., bugs, database failures).
*/
import artistsRoutes from "./routes/artists.js";
import galleriesRoutes from "./routes/galleries.js";
import paintingsRoutes from "./routes/paintings.js";
import genresRoutes from "./routes/genres.js";
import erasRoutes from "./routes/eras.js";
import countsRoutes from "./routes/counts.js";

// Modularized Routes
app.use("/api/artists", artistsRoutes);
app.use("/api/galleries", galleriesRoutes);
app.use("/api/paintings", paintingsRoutes);
app.use("/api/genres", genresRoutes);
app.use("/api/eras", erasRoutes);
app.use("/api/counts", countsRoutes);

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});

