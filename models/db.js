// models/db.js - Supabase Client Setup
import { createClient } from "@supabase/supabase-js";

const SUPABASE_URL = "https://qgofaivdyuyxmwgxhebm.supabase.co";
const SUPABASE_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InFnb2ZhaXZkeXV5eG13Z3hoZWJtIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MzkxMTk4NDYsImV4cCI6MjA1NDY5NTg0Nn0.W4gImKc_7lM9gQKaA5yCteVqT2phWk0fzcbmnQ3yEaU";
const supabase = createClient(SUPABASE_URL, SUPABASE_KEY);

export default supabase;
