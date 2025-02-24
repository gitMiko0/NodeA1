import supabase from "../models/db.js";
/*
 *  A reusable function was attempted for the queries in this module but they were
 *  far too long due to their complexity. Instead they were implemented in supabase 
 *  as functions with straightforward SQL queries through the SQL editor's shared queries.
 */
/*
Get the count of paintings for each genre (sorted fewest to most)
CREATE OR REPLACE FUNCTION get_genre_counts()
RETURNS TABLE (genreName TEXT, count INTEGER) AS $$
BEGIN
    RETURN QUERY
    SELECT g."genreName", COUNT(pg."paintingId")::INTEGER AS count
    FROM "genres" g
    JOIN "paintinggenres" pg ON g."genreId" = pg."genreId"
    GROUP BY g."genreName"
    ORDER BY count ASC;
END;
 */
export const getGenreCounts = async (req, res) => {
    try {
        const { data, error } = await supabase.rpc("get_genre_counts");

        if (error) throw error;

        res.json(data);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

/*
Get the count of paintings for each artist (sorted most to least)
CREATE OR REPLACE FUNCTION get_artist_counts()
RETURNS TABLE (artist TEXT, count INTEGER) AS $$
BEGIN
    RETURN QUERY
    SELECT CONCAT(a."firstName", ' ', a."lastName") AS artist, COUNT(p."paintingId")::INTEGER AS count --complains about type mismatch without ::INTEGER
    FROM "artists" a
    JOIN "paintings" p ON a."artistId" = p."artistId"
    GROUP BY artist
    ORDER BY count DESC;
END;
 */
export const getArtistCounts = async (req, res) => {
    try {
        const { data, error } = await supabase.rpc("get_artist_counts");

        if (error) throw error;

        res.json(data);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

/*
Get top genres with more than `ref` paintings (sorted most to least)
CREATE OR REPLACE FUNCTION get_top_genres(min_paintings INTEGER)
RETURNS TABLE (genreName TEXT, count INTEGER) AS $$
BEGIN
    RETURN QUERY
    SELECT g."genreName", COUNT(pg."paintingId")::INTEGER AS count
    FROM "genres" g
    JOIN "paintinggenres" pg ON g."genreId" = pg."genreId"
    GROUP BY g."genreName"
    HAVING COUNT(pg."paintingId") > min_paintings
    ORDER BY count DESC;
END;
*/
export const getTopGenres = async (req, res) => {
    try {
        const minPaintings = parseInt(req.params.ref, 10);
        if (isNaN(minPaintings) || minPaintings < 0) {
            return res.status(400).json({ error: "Invalid reference value. It must be a positive number." });
        }

        const { data, error } = await supabase.rpc("get_top_genres", { min_paintings: minPaintings });

        if (error) throw error;

        res.json(data);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};
