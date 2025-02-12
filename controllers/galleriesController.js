// galleriesController.js

import * as utils from "./utils.js";  // Import the utils file
const tableName = "galleries"; // Define table name.
const idColumn = "galleryId";

export const getAllGalleries = async () => {
  return await utils.getAllSorted(tableName, "galleryName", true);
};

export const getGalleryById = async (id) => {
  return await utils.searchById(tableName, idColumn, id);
};

export const getGalleriesByCountry = async (substring) => {
  return await utils.searchBySubstring(tableName, "galleryCountry", substring);
};

export const getPaintingsByGallery = async (id) => {
  return await utils.searchWithJoin("paintings", tableName, "galleryId", idColumn, id);
};
