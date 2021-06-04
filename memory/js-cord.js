const discord = require("@jay3332/js-cord");
const { TOKEN, OWNER_ID } = require("../configs-node");
const { READY } = require("../utils/events-node");

const started = Date.now();
let time = Date.now();

const client = new discord.Client();

client.on("ready", () => {
  READY(started);
});

client.on("shardReady", (id) => {
  time = SHARD_READY(id, time);
});

client.on("message", async (msg) => {
  if (message.author.id !== OWNER_ID || message.content !== "!starttests")
    return;

  logMemory();
  setInterval(logMemory, 60000);
});

client.login(TOKEN);

let counter = 1;
function logMemory() {
  const usage = Deno.memoryUsage();
  const bytes = 1000000;

  console.log({
    minutes: counter,
    rss: usage.rss / bytes,
    heapUsed: usage.heapUsed / bytes,
    heapTotal: usage.heapTotal / bytes,
    lib: "discordeno",
    guilds: client.guilds.length,
    members: client.users.length,
    messages: client.messages.length,
    channels: client.channels.length,
  });
  counter++;
}
