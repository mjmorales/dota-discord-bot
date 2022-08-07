const {
  Client,
  GatewayIntentBits,
} = require("discord.js");

const { token } = require("./config.json");
const { once, interactionCreate } = require("./src/hooks.js")

const client = new Client({ intents: [GatewayIntentBits.Guilds] });
once(client);
interactionCreate(client);
client.login(token);

const { startSchedule } = require('./src/schedule');
startSchedule(client);
