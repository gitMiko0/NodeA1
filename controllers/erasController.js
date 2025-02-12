// erasController.js

import * as utils from "./utils.js";  // Import the utils file
const tableName = "eras"; // Define table name.
const idColumn = "eraId";

export const getAllEras = async () => {
  return await utils.getAllSorted(tableName, "eraName", true);
};

export const getEraById = async (id) => {
  return await utils.searchById(tableName, idColumn, id);
};

export const getPaintingsByEra = async (id) => {
  return await utils.searchWithJoin("paintings", tableName, "eraId", idColumn, id);
};
