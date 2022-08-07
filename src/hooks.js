const { db } = require('./db.js');

module.exports = {
  once: (client) => {
    client.once("ready", async () => {
      console.log("Ready!");
    });
  },
  interactionCreate: (client) => {
    client.on('interactionCreate', async interaction => {
      if (!interaction.isChatInputCommand()) return;

      if (interaction.commandName === 'dota') {
        if (interaction.options.getSubcommand() === 'addleague') {
          const league = interaction.options.getString('league');
          const { data, error } = await db
          .from('trackable_leagues')
          .insert([
            {
              name: league,
            }
          ]);
          if(error) { 
            console.error(error);
            await interaction.reply(`Could not add ${league}`);
          } else {
            await interaction.reply(`${league} is now being tracked`);
          }
        } else if (interaction.options.getSubcommand() === 'rmleague') {
          const league = interaction.options.getString('league');
          const { data, error } = await db
          .from('trackable_leagues')
          .delete()
          .match(
            {
              name: league,
            }
          );
          if(error) { 
            console.error(error);
            await interaction.reply(`Could not remove ${league}`);
          } else {
            await interaction.reply(`${league} is no longer being tracked`);
          }
        }
      }
    });
  }
}
