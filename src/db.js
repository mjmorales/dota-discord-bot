const { createClient } = require('@supabase/supabase-js');
const { db_url, public_anon_key } = require("../config.json");

const options = {
  schema: 'public',
  headers: { 'x-my-custom-header': 'dota-game-tracker' },
  autoRefreshToken: true,
  persistSession: true,
  detectSessionInUrl: true
}
const supabase = createClient(db_url, public_anon_key, options)

module.exports = {
  db: supabase,
}
