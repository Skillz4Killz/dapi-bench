const Eris = require("eris");
const { TOKEN, OWNER_ID } = require("../configs-node");
const { READY, SHARD_READY, logMemory } = require("../utils/events-node");

const erisStarted = Date.now();
let erisTime = Date.now();
let erisCounter = 0;

const bot = new Eris.Client(TOKEN, {
  maxShards: "auto",
  intents: [
    "directMessageReactions",
    "directMessages",
    "guildBans",
    "guildEmojis",
    "guildInvites",
    "guildMembers",
    "guildMessageReactions",
    "guildMessages",
    "guildVoiceStates",
    "guilds",
  ],
});

bot.on("ready", () => {
  READY(erisStarted);
});

bot.on("shardReady", (id) => {
  erisTime = SHARD_READY(id, erisTime);
});

bot.on("error", (err) => {
  console.error(err); // or your preferred logger
});

bot.on("messageCreate", (message) => {
  if (message.author.id !== OWNER_ID) return;
  if (message.content !== "!starttests") return;

  erisCounter = logMemory(
    process.memoryUsage(),
    erisCounter,
    "eris",
    bot.guilds.size,
    bot.users.size,
    bot.privateChannels.reduce((a, b) => a + b.messages.size, 0) +
      bot.guilds.reduce((a, b) => a + (b.channels.reduce((c, d) => c + (d.messages?.size || 0), 0) || 0), 0),
    bot.privateChannels.size + Object.keys(bot.channelGuildMap).length
  );
  setInterval(() => {
    erisCounter = logMemory(
      process.memoryUsage(),
      erisCounter,
      "eris",
      bot.guilds.size,
      bot.users.size,
      bot.privateChannels.reduce((a, b) => a + b.messages.size, 0) +
        bot.guilds.reduce((a, b) => a + (b.channels.reduce((c, d) => c + (d.messages?.size || 0), 0) || 0), 0),
      bot.privateChannels.size + Object.keys(bot.channelGuildMap).length
    );
  }, 60000);
});

bot.connect();
