const { ToadScheduler, SimpleIntervalJob, AsyncTask } = require('toad-scheduler')
const scheduler = new ToadScheduler()
const { db } = require('./db.js');
const { EmbedBuilder } = require('discord.js');
const { channel_id } = require("../config.json");

const createEmbed = (record) => {
  const timestamp = new Date(Date.parse(record.starts_at) - 14400000)
  const embed = new EmbedBuilder()
	.setColor(0x0099FF)
	.setTitle(`Upcoming Pro Match: ${record.team1} vs ${record.team2}`)
	.setURL(`${record.stream_url}`)
	.setThumbnail('https://i.imgur.com/CGAi4QR.png')
	.addFields(
		{ name: 'League Name', value: record.league_name },
		{ name: 'Match Type', value: record.match_type },
		{ name: 'Starts At', value: timestamp.toLocaleString() , inline: true },
	)
  return embed
}

module.exports = {
  startSchedule: (client) => {
    const { importMatches } = require('./tracker');
    const importMatchesTask = new AsyncTask(
      'Import Matches', 
      importMatches,
      (err) => { console.error(error) }
    )

    const alertUpcomingTask = new AsyncTask(
      'Alert Upcoming Matches', 
      async () => {
        client.once("ready", async () => {
          var { data, error } = await db
          .rpc('fetch_upcoming_matches', {}, { count: 'exact' })
          if (error) console.error(error)

          const channel = await client.channels.fetch(channel_id);
          const embeds = Array.from(data, record => { return createEmbed(record) })
          if(embeds.length > 0) channel.send({ embeds: embeds });
        });
      },
      (err) => { console.error(err) }
    )
    const jobs = [
      new SimpleIntervalJob({ minutes: 30, runImmediately: true, }, importMatchesTask),
      new SimpleIntervalJob({ minutes: 10, runImmediately: true, }, alertUpcomingTask),
    ]
    jobs.map(job => scheduler.addSimpleIntervalJob(job))
  }
}
