const discord = require("@jay3332/js-cord");
const { TOKEN, OWNER_ID } = require("../configs-node");
const { READY, SHARD_READY, logMemory } = require("../utils/events-node");

const jscordStarted = Date.now();
let jscordTime = Date.now();
let jscordCounter = 1;

const jscord = new discord.Client({
  shard: true,
});

jscord.on("ready", () => {
  READY(jscordStarted);
});

jscord.on("shardReady", (id) => {
  jscordTime = SHARD_READY(id, jscordTime);
});

jscord.on("message", async (msg) => {
  if (message.author.id !== OWNER_ID || message.content !== "!starttests")
    return;

  jsCounter = logMemory(
    process.memoryUsage(),
    jscordCounter,
    "jscord",
    jscord.guilds.length,
    jscord.users.length,
    jscord.messages.length,
    jscord.channels.length
  );
  setInterval(() => {
    jscordCounter = logMemory(
      process.memoryUsage(),
      jscordCounter,
      "jscord",
      jscord.guilds.length,
      jscord.users.length,
      jscord.messages.length,
      jscord.channels.length
    );
  }, 60000);
});

jscord.login(TOKEN);
