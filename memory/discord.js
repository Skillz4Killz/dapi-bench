const { Client } = require("discord.js");
const { TOKEN, OWNER_ID } = require("../configs-node");
const { READY, SHARD_READY, logMemory } = require("../utils/events-node");

const djsStarted = Date.now();
let djsTime = Date.now();
let djsCounter = 0;

const djs = new Client({
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

djs
  .on("ready", () => {
    READY(djsStarted);
  })
  .on("shardReady", (id) => {
    djsTime = SHARD_READY(id, djsTime);
  })
  .on("message", (message) => {
    if (message.author.id !== OWNER_ID) return;
    if (message.content !== "!starttests") return;

    djsCounter = logMemory(
      process.memoryUsage(),
      djsCounter,
      "discord.js",
      djs.guilds.cache.size,
      djs.users.cache.size,
      djs.channels.cache.reduce((a, b) => a + (b.messages?.cache.size || 0), 0),
      djs.channels.cache.size
    );
    setInterval(() => {
      djsCounter = logMemory(
        process.memoryUsage(),
        djsCounter,
        "discord.js",
        djs.guilds.cache.size,
        djs.users.cache.size,
        djs.channels.cache.reduce(
          (a, b) => a + (b.messages?.cache.size || 0),
          0
        ),
        djs.channels.cache.size
      );
    }, 60000);
  });

djs.login(TOKEN);
