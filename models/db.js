// models/db.js - Supabase Client Setup
import { createClient } from "@supabase/supabase-js";

const SUPABASE_URL = "https://oywollvzjcqwhtcndinb.supabase.co";
const SUPABASE_KEY = "sb_publishable__wmxmFaPDLMohi8CfA5bwg_jwNiOGMS";
const supabase = createClient(SUPABASE_URL, SUPABASE_KEY);

export default supabase;
