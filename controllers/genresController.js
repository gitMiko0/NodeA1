// genresController.js

import * as utils from "./utils.js";  // Import the utils file
const tableName = "genres"; // Define table name.
const idColumn = "genreId";

export const getAllGenres = async () => {
  return await utils.getAllSorted(tableName, idColumn, true);
};

export const getGenreById = async (id) => {
  return await utils.searchById(tableName, idColumn, id);
};

export const getGenresByPainting = async (paintingId) => {
  return await utils.searchWithManyToMany(
    "genres",          // Main table
    "paintingGenres",  // Linking table
    "paintings",       // Target table
    "genreId",         // ID column in genres
    "genreId",         // Linking column in paintingGenres
    "paintingId",      // Linking column in paintingGenres
    paintingId         // The paintingId to filter by
  );
};


export const getPaintingsByGenre = async (id) => {
  return await utils.searchWithJoin("paintings", tableName, "genreId", idColumn, id);
};

export const getGenreCounts = async () => {
  return await utils.getCount(tableName, "genreName", "paintings");
};

export const getTopGenres = async (threshold) => {
  return await utils.getTopCounts(tableName, "genreName", "paintings", threshold);
};
