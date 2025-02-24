// genresController.js

import * as utils from "./utils.js"; 
const tableName = "genres";
const idColumn = "genreId";

export const getAllGenres = async () => {
  return await utils.getAllSorted(tableName, idColumn, true);
};

export const getGenreById = async (id) => {
  return await utils.searchById(tableName, idColumn, id);
};

/**
 * Get all genres for a given painting
 * @param {number} paintingId - The ID of the painting
 * @returns {Promise<Array>} - Array of genres for the painting
 */
export const getGenresByPainting = async (paintingId) => {
  return await utils.fetchManyToMany(
    tableName,         // Target table
    "paintinggenres",  // Linking table
    idColumn,          // Column in target table
    idColumn,          // Column in linking table referencing target
    "paintingId",      // Column in linking table filtering by painting ID
    paintingId,        // The paintingId to filter by
    ["*"],             // Select all fields from genres
    idColumn,          // Order by genreName
    true               // Sort ascending
  );
};

