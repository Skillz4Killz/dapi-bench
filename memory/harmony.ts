import { Client, GatewayIntents } from "https://deno.land/x/harmony/mod.ts";
import { TOKEN, OWNER_ID } from "../configs-deno.ts";
import { READY, SHARD_READY } from "../utils/events-deno";

const client = new Client({ token: TOKEN });

const started = Date.now();
let time = Date.now();

client
  .on("ready", () => {
    READY(started);
  })
  .on("shardReady", (id) => {
    time = SHARD_READY(id, time);
  })
  .on("message", (message) => {
    if (message.author.id !== OWNER_ID || message.content !== "!starttests")
      return;

    logMemory();
    setInterval(logMemory, 60000);
  });

let counter = 1;
function logMemory() {
  const usage = Deno.memoryUsage();
  const bytes = 1000000;
  console.log(
    `[${counter} harmony] Memory Usage RSS: ${usage.rss / bytes}MB Heap Used: ${
      usage.heapUsed / bytes
    }MB Heap Total: ${usage.heapTotal / bytes}MB`
  );
  counter++;
}

client.connect(TOKEN, [
  GatewayIntents.DIRECT_MESSAGE_REACTIONS,
  GatewayIntents.GUILD_BANS,
  GatewayIntents.GUILD_EMOJIS,
  GatewayIntents.GUILD_INVITES,
  GatewayIntents.GUILD_MEMBERS,
  GatewayIntents.GUILD_MESSAGE_REACTIONS,
  GatewayIntents.GUILD_MESSAGES,
  GatewayIntents.GUILD_VOICE_STATES,
  GatewayIntents.GUILDS,
]);
