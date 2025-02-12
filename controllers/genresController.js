// genresController.js

import * as utils from "./utils.js";  // Import the utils file
const tableName = "genres"; // Define table name.
const idColumn = "genreId";

export const getAllGenres = async () => {
  return await utils.getAllSorted(tableName, "genreName", true);
};

export const getGenreById = async (id) => {
  return await utils.searchById(tableName, idColumn, id);
};

export const getGenresByPainting = async (id) => {
  return await utils.searchWithJoin(tableName, "paintings", idColumn, "id", id);
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
