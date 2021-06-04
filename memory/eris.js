const Eris = require("eris");
const { TOKEN, OWNER_ID } = require("../configs-node");

const started = Date.now();
let time = Date.now();

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
  console.log(
    "Successfully connected to gateway",
    (Date.now() - started) / 1000,
    "seconds to start."
  );
});

bot.on("shardReady", (id) => {
  const here = Date.now();
  console.log(`SHARD READY`, id, (here - time) / 1000, "seconds to start.");
  time = here;
});

bot.on("error", (err) => {
  console.error(err); // or your preferred logger
});

bot.on("message", (message) => {
  if (message.author.id !== OWNER_ID || message.content !== "!starttests")
    return;

  logMemory();
  setInterval(logMemory, 60000);
});

let counter = 1;
function logMemory() {
  const usage = process.memoryUsage();
  const bytes = 1000000;
  console.log(
    `[${counter} eris] Memory Usage RSS: ${usage.rss / bytes}MB Heap Used: ${
      usage.heapUsed / bytes
    }MB Heap Total: ${usage.heapTotal / bytes}MB | Members ${
      bot.users.size
    } Guilds: ${bot.guilds.size}`
  );
  counter++;
}

bot.connect();
