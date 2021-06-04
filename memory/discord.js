const { Client } = require("discord.js");
const { TOKEN, OWNER_ID } = require("../configs-node");
const { READY, SHARD_READY, logMemory } = require("../utils/events-node");

const djsStarted = Date.now();
let djsTime = Date.now();
let djsCounter = 0;

const client = new Client({
  token: TOKEN,
  shards: "auto",
  ws: {
    intents: [
      "DIRECT_MESSAGE_REACTIONS",
      "DIRECT_MESSAGES",
      "GUILD_BANS",
      "GUILD_EMOJIS",
      "GUILD_INVITES",
      "GUILD_MEMBERS",
      "GUILD_MESSAGE_REACTIONS",
      "GUILD_MESSAGES",
      "GUILD_VOICE_STATES",
      "GUILDS",
    ],
  },
});

client
  .on("ready", () => {
    READY(djsStarted);
  })
  .on("shardReady", (id) => {
    djsTime = SHARD_READY(id, djsTime);
  })
  .on("message", (message) => {
    if (message.author.id !== OWNER_ID || message.content !== "!starttests")
      return;

    logMemory(
      process.memoryUsage(),
      djsCounter,
      "discord.js",
      client.guilds.cache.size,
      client.users.cache.size,
      0,
      client.channels.cache.size
    );
    setInterval(logMemory, 60000);
  });

client.login(TOKEN);
