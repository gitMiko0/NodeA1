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

export const getCountsByGroup = async (tableName, groupColumn, countColumn, havingCondition = null, sortOrder = 'desc') => {
  try {
    let query = supabase
      .from(tableName)
      .select(`${groupColumn}, count(${countColumn})`, { count: 'exact' })
      .group(groupColumn)
      .order('count', { ascending: sortOrder === 'asc' });

    if (havingCondition) {
      query = query.gte('count', havingCondition);
    }

    const { data, error } = await query;

    if (error) throw new Error(error.message);
    return data || [];
  } catch (error) {
    console.error(`Error in getCountsByGroup:`, error);
    throw error;
  }
};

export const complexJoinQuery = async (mainTable, joins, select, filters = null, orderBy = null) => {
  try {
    let query = supabase.from(mainTable).select(select);

    // Apply joins
    joins.forEach(join => {
      query = query.join(join.table, join.on);
    });

    // Apply filters if any
    if (filters) {
      filters.forEach(filter => {
        query = query.filter(filter.column, filter.operator, filter.value);
      });
    }

    // Apply ordering if specified
    if (orderBy) {
      query = query.order(orderBy.column, { ascending: orderBy.ascending });
    }

    const { data, error } = await query;

    if (error) throw new Error(error.message);
    return data || [];
  } catch (error) {
    console.error(`Error in complexJoinQuery:`, error);
    throw error;
  }
};

export const searchSubstringWithJoin = async (mainTable, joinTable, joinCondition, searchColumn, substring) => {
  try {
    const { data, error } = await supabase
      .from(mainTable)
      .select(`*, ${joinTable}(*)`)
      .eq(joinCondition.mainColumn, joinCondition.joinColumn)
      .ilike(`${joinTable}.${searchColumn}`, `%${substring}%`);

    if (error) throw new Error(error.message);
    return data || [];
  } catch (error) {
    console.error(`Error in searchSubstringWithJoin:`, error);
    throw error;
  }
};

