// paintingsController.js

import supabase from "../models/db.js";
import * as utils from "./utils.js";
const tableName = "paintings";
const idColumn = "paintingId";
const artistIdColumn = "artistId";
const galleryIdColumn = "galleryId";
const yearColumn = "yearOfWork";

export const getAllPaintings = async () => {
  return await utils.getAllSorted(tableName, idColumn, true);
};

export const getPaintingById = async (id) => {
  return await utils.searchById(tableName, idColumn, id);
};

export const getPaintingsSorted = async (sortBy = "year") => {
  if (sortBy !== "year" && sortBy !== "title") {
    throw new Error("Invalid sort parameter. Use 'year' or 'title'.");
  }
  return await utils.getAllSorted(tableName, sortBy === "year" ? yearColumn : "title", true);
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
      .select("*") // show all contents of the paintings
      .gte(yearColumn, start)
      .lte(yearColumn, end)
      .order(yearColumn, { ascending: true }); // sort by the years

    if (error) throw new Error(error.message);
    return data || [];
  } catch (error) {
    console.error(`Error in getPaintingsByYearRange for years ${start}-${end}:`, error);
    throw error;
  }
};

export const searchPaintingsByTitle = async (substring) => {
  return await utils.searchBySubstring(tableName, "title", substring);
};

export const getPaintingsByGallery = async (galleryId) => {
  try {
    const { data, error } = await supabase
      .from("paintings")
      .select("*, galleries(*)")  // Join paintings with gallery details
      .eq("galleryId", galleryId);

    if (error) throw new Error(error.message);
    return data || [];
  } catch (error) {
    console.error(`Error fetching paintings by gallery:`, error);
    throw error;
  }
};


export const getPaintingsByArtist = async (artistId) => {
  try {
    const { data, error } = await supabase
      .from("paintings")
      .select("*, artists(*)")  // Join paintings with artist details
      .eq("artistId", artistId);

    if (error) throw new Error(error.message);
    return data || [];
  } catch (error) {
    console.error(`Error fetching paintings by artist:`, error);
    throw error;
  }
};


export const getPaintingsByArtistNationality = async (substring) => {
  try {
    const { data, error } = await supabase
      .from("paintings")
      .select("*, artists!inner(*)")  // Explicit inner join with artists
      .ilike("artists.nationality", `${substring}%`);  // Apply filter on nationality

    if (error) throw new Error(error.message);
    return data || [];
  } catch (error) {
    console.error(`Error fetching paintings by artist nationality:`, error);
    throw error;
  }
};

/**
 * Get all paintings for a given genre
 * @param {number} genreId - The ID of the genre
 * @returns {Promise<Array>} - Array of paintings for the genre
 */
export const getPaintingsByGenre = async (genreId) => {
  return await utils.fetchManyToMany(
    "paintings",      // Target table (paintings)
    "paintinggenres", // Linking table
    "paintingId",     // Column in target table
    "paintingId",     // Column in linking table referencing target
    "genreId",        // Column in linking table filtering by genre ID
    genreId,          // The genreId to filter by
    ["paintingId", "title", "yearOfWork"], // Select only required fields
    "yearOfWork",     // Order by yearOfWork
    true              // Sort ascending
  );
};

