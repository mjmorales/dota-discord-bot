const {
  ActionRowBuilder,
  EmbedBuilder,
	SelectMenuBuilder,
} = require("discord.js");


module.exports = {
  once: (client) => {
    client.once("ready", async () => {
      console.log("Ready!");
    });
  },
  interactionCreate: (client) => {
    client.on("interactionCreate", async (interaction) => {
      if (!interaction.isChatInputCommand()) return;
    
      const { commandName } = interaction;
    
      if (commandName === "ping") {
        console.log("PING");
        const row = new ActionRowBuilder()
          .addComponents(
            new SelectMenuBuilder()
              .setCustomId('select')
              .setPlaceholder('Nothing selected')
              .addOptions(
                {
                  label: 'Select me',
                  description: 'This is a description',
                  value: 'first_option',
                },
                {
                  label: 'You can select me too',
                  description: 'This is also a description',
                  value: 'second_option',
                },
              ),
          );

        const embed = new EmbedBuilder()
          .setColor(0x0099ff)
          .setTitle("Some title")
          .setURL("https://discord.js.org/")
          .setDescription("Some description here");
    
        await interaction.reply({
          content: "Pong!",
          ephemeral: true,
          embeds: [embed],
          components: [row],
        });
      } else if (commandName === "server") {
        await interaction.reply(
          `Server name: ${interaction.guild.name}\nTotal members: ${interaction.guild.memberCount}`
        );
      } else if (commandName === "user") {
        await interaction.reply(
          `Your tag: ${interaction.user.tag}\nYour id: ${interaction.user.id}`
        );
      }
    });

    client.on('interactionCreate', interaction => {
      if (interaction.isSelectMenu()) {
        console.log(interaction);
        interaction.reply('Pong!');
      }
    });
  }
}
