const { SlashCommandBuilder, Routes } = require('discord.js');
const { REST } = require('@discordjs/rest');
const { clientId, guildId, token } = require('./config.json');

const commands = new SlashCommandBuilder()
	.setName('dota')
	.setDescription('Dota commands since we\'re lazy...')
	.addSubcommand(subcommand =>
		subcommand
			.setName('addleague')
			.setDescription('Add a new league to track matches')
			.addStringOption(option =>
				option.setName('league')
					.setDescription('The league to track')
					.setRequired(true)))
		.addSubcommand(subcommand =>
			subcommand
				.setName('rmleague')
				.setDescription('Remove a league from the tracker')
				.addStringOption(option =>
					option.setName('league')
						.setDescription('The league to remove')
						.setRequired(true)))

const rest = new REST({ version: '10' }).setToken(token);
rest.put(Routes.applicationGuildCommands(clientId, guildId), { body: [commands.toJSON()] })
	.then(() => console.log('Successfully registered application commands.'))
	.catch(console.error);
