// artistsController.js

import * as utils from "./utils.js";  // Import the utils file
const tableName = "artists"; // Define table name.
const idColumn = 'artistId';

export const getAllArtists = async () => {
  return await utils.getAllSorted(tableName, "lastName"); // Sort by last name
};

export const getArtistById = async (id) => {
  return await utils.searchById(tableName, idColumn, id);
};

export const searchArtistsByName = async (substring) => {
  return await utils.searchBySubstring(tableName, "lastName", substring);
};

export const searchArtistsByCountry = async (substring) => {
  return await utils.searchBySubstring(tableName, "nationality", substring);
};
