// paintingsController.js

import supabase from "../models/db.js";
import * as utils from "./utils.js";  // Import the utils file
const tableName = "paintings"; // Define table name.
const idColumn = "paintingId";
const artistIdColumn = "artistId";
const galleryIdColumn = "galleryId";
const yearColumn = "yearOfWork";

export const getAllPaintings = async () => {
  return await utils.getAllSorted(tableName, "title", true);
};

export const getPaintingById = async (id) => {
  return await utils.searchById(tableName, idColumn, id);
};

export const getPaintingsByArtist = async (id) => {
  return await utils.searchWithJoin(tableName, "artists", artistIdColumn, "id", id);
};

/**
 * Retrieves paintings within a specific year range.
 * Uses a custom query because it requires a range filter.
 */
export const getPaintingsByYearRange = async (start, end) => {
  if (parseInt(start) > parseInt(end)) throw new Error("Start year must be before end year.");

  try {
    const { data, error } = await supabase
      .from(tableName)
      .select("paintingId, title, yearOfWork")
      .gte("yearOfWork", start)
      .lte("yearOfWork", end)
      .order("yearOfWork", { ascending: true });

    if (error) throw new Error(error.message);
    return data || [];
  } catch (error) {
    console.error(`Error in getPaintingsByYearRange for years ${start}-${end}:`, error);
    throw error;
  }
};

export const getPaintingsByGallery = async (id) => {
  return await utils.searchWithJoin(tableName, "galleries", galleryIdColumn, "id", id);
};

export const getPaintingsSorted = async (sortBy = "year") => {
  if (sortBy !== "year" && sortBy !== "title") {
    throw new Error("Invalid sort parameter. Use 'year' or 'title'.");
  }
  return await utils.getAllSorted(tableName, sortBy === "year" ? yearColumn : "title", true);
};

export const searchPaintingsByTitle = async (substring) => {
  return await utils.searchBySubstring(tableName, "title", substring);
};

export const searchPaintingsByNationality = async (nationality) => {
  return await utils.searchWithJoin(tableName, "artists", artistIdColumn, "id", nationality);
};
