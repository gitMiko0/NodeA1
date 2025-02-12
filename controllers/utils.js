// utils.js

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
 * Searches for records in a main table joined with another table based on a relationship,
 * filtered by a nationality substring in the joined table.
 *
 * @param {string} mainTable                The name of the main table.
 * @param {string} joinTable                The name of the table to join with.
  * @param {string} mainTableJoinColumn     The column in the main table used for the join (foreign key).
 * @param {string} joinTableJoinColumn      The column in the join table used for the join (primary key).
 * @param {string} nationality              The nationality substring to filter by (case-insensitive).
 * @returns {Promise<array>}                An array of matching records from the main table with the joined table data.
 * @throws {Error}                          If there is an error during the database query.
 */
export const searchWithJoin = async (mainTable, joinTable, mainTableJoinColumn, joinTableJoinColumn, nationality) => {
    try {
        const { data, error } = await supabase
            .from(mainTable)
            .select(`*, ${joinTable}(nationality)`)
            .eq(`${mainTableJoinColumn}`, `${joinTableJoinColumn}.id`)
            .ilike(`${joinTable}.nationality`, `%${nationality}%`);

        if (error) {
            throw new Error(error.message);
        }
        return data || []; // Return an empty array if no data is found
    } catch (error) {
        console.error(`Error in searchWithJoin for mainTable ${mainTable}, joinTable ${joinTable}, nationality ${nationality}:`, error);
        throw error; // Re-throw the error to be caught by the route handler
    }
}