const { Client } = require("discord.js");
const { TOKEN, OWNER_ID } = require("../configs-node");

const started = Date.now();
let time = Date.now();

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
    console.log(
      "Successfully connected to gateway",
      (Date.now() - started) / 1000,
      "seconds to start."
    );
  })
  .on("shardReady", (id) => {
    const here = Date.now();
    console.log(`SHARD READY`, id, (here - time) / 1000, "seconds to start.");
    time = here;
  })
  .on("message", (message) => {
    if (message.author.id !== OWNER_ID || message.content !== "!starttests")
      return;

    logMemory();
    setInterval(logMemory, 60000);
  });

client.login(TOKEN);

let counter = 1;
function logMemory() {
  const usage = process.memoryUsage();
  const bytes = 1000000;
  console.log(
    `[${counter} djs] Memory Usage RSS: ${usage.rss / bytes}MB Heap Used: ${
      usage.heapUsed / bytes
    }MB Heap Total: ${usage.heapTotal / bytes}MB | Members ${
      client.users.cache.size
    } Guilds: ${client.guilds.cache.size}`
  );
  counter++;
}
