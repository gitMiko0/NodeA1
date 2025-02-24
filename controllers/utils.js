// utils.js - contains reusable polymorphic functions that handle basic queries for any relational table
import supabase from "../models/db.js";

/**
 * Retrieves a single record from a table by its ID.
 *
 * @param {string} tableName        The name of the table to query.
 * @param {string} idColumn         The name of the ID column in the table.
 * @param {any} idValue             The value of the ID to search for.
 * @returns {Promise<object|null>}  The record if found, null otherwise.
 * @throws {Error}                  If there is an error during the database query.
 */
export const searchById = async (tableName, idColumn, idValue) => {
  try {
    const { data, error } = await supabase
      .from(tableName)
      .select("*")
      .eq(idColumn, idValue)
      .single(); // Use .single() to fetch one record

    if (error) {
      throw new Error(error.message);
    }
    return data || null; // Return null if no data is found
  } catch (error) {
    console.error(`Error in searchById for table ${tableName}, ID ${idValue}:`, error);
    throw error; // Re-throw the error to be caught by the route handler
  }
};

/**
 * Searches for records in a table where a specified column contains a substring.
 *
 * @param {string} tableName    The name of the table to query.
 * @param {string} columnName   The name of the column to search within.
 * @param {string} substring    The substring to search for (case-insensitive).
 * @returns {Promise<array>}    An array of matching records.  Returns an empty array if no matches are found.
 * @throws {Error}              If there is an error during the database query.
 */
export const searchBySubstring = async (tableName, columnName, substring) => {
  try {
    const { data, error } = await supabase
      .from(tableName)
      .select("*")
      .ilike(columnName, `%${substring}%`); // Case-insensitive search

    if (error) {
      throw new Error(error.message);
    }
    return data || [];  // Return an empty array if no data is found
  } catch (error) {
    console.error(`Error in searchBySubstring for table ${tableName}, column ${columnName}, substring ${substring}:`, error);
    throw error; // Re-throw the error to be caught by the route handler
  }
};

/**
 * Retrieves all records from a table, sorted by a specified column.
 *
 * @param {string} tableName            The name of the table to query.
 * @param {string} sortColumn           The name of the column to sort by.
 * @param {boolean} [ascending=true]    Whether to sort in ascending order (default is true).
 * @returns {Promise<array>}            An array of all records from the table, sorted by the specified column.
 * @throws {Error}                      If there is an error during the database query.
 */
export const getAllSorted = async (tableName, sortColumn, ascending = true) => {
  try {
    const { data, error } = await supabase
      .from(tableName)
      .select("*")
      .order(sortColumn, { ascending });

    if (error) {
      throw new Error(error.message);
    }
    return data || []; // Return an empty array if no data is found.
  } catch (error) {
    console.error(`Error in getAllSorted for table ${tableName}, sortColumn ${sortColumn}, ascending ${ascending}:`, error);
    throw error; // Re-throw the error to be caught by the route handler
  }
};

/**
 * Generic function to fetch records via a many-to-many relationship.
 *
 * @param {string}        targetTable               The table we want data from (e.g., "genres" or "paintings")
 * @param {string}        linkingTable              The many-to-many relationship table (e.g., "paintinggenres")
 * @param {string}        targetTableIdColumn       The ID column in the target table (e.g., "genreId" or "paintingId")
 * @param {string}        linkingTableTargetColumn  The column in linkingTable referencing the targetTable (e.g., "genreId" or "paintingId")
 * @param {string}        linkingTableFilterColumn  The column in linkingTable filtering by a given ID (e.g., "paintingId" or "genreId")
 * @param {number}        filterValue               The specific ID to filter by
 * @param {Array<string>} selectFields              The fields to retrieve from the targetTable
 * @param {string}        orderByColumn             The column to sort by (optional)
 * @param {boolean}       ascending                 Whether sorting is ascending (default: true)
 * @returns {Promise<Array>}                        Array of matching records
 */
export const fetchManyToMany = async (
  targetTable,
  linkingTable,
  targetTableIdColumn,
  linkingTableTargetColumn,
  linkingTableFilterColumn,
  filterValue,
  selectFields = ["*"],
  orderByColumn = null,
  ascending = true
) => {
  try {
    let query = supabase
      .from(linkingTable) // Start from the linking table
      .select(`${targetTable} (${selectFields.join(", ")})`) // Fetch data from target table
      .eq(linkingTableFilterColumn, filterValue); // Filter by the given ID

    if (orderByColumn) {
      query = query.order(orderByColumn, { ascending });
    }

    const { data, error } = await query;
    if (error) throw new Error(error.message);

    return data.map(record => record[targetTable]) || []; // Extract target table records
  } catch (error) {
    console.error(`Error in fetchManyToMany:`, error);
    throw error;
  }
};
