import supabase from "../models/db.js";

/**
 * Get the count of paintings for each genre (sorted fewest to most)
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

/**
 * Get the count of paintings for each artist (sorted most to least)
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

/**
 * Get top genres with more than `ref` paintings (sorted most to least)
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
