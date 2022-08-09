const { db } = require('./db.js');
const httpEndpoint = 'https://dota-matches-api.beequeue.workers.dev/v1/matches';

const commitMatch = async (match) => {
  const { data, error } = await db
  .from('matches')
  .insert([
    {
      hash: match.hash,
      team1: match.teams[0].name,
      team2: match.teams[1].name,
      match_type: match.matchType,
      starts_at: match.startsAt,
      league_name: match.leagueName,
      stream_url: match.streamUrl,
    }
  ]);
  if(error) { 
    // console.error(error);
  }
}

module.exports = {
  importMatches: async () => {
    const response = await fetch(httpEndpoint);
    const text = await response.text();
    const matches = JSON.parse(text);
    matches.map(commitMatch);
  },
}
