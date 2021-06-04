import { Client, GatewayIntents } from "https://deno.land/x/harmony@v2.0.0-rc2/mod.ts";
import { TOKEN, OWNER_ID } from "../configs-deno.ts";
import { READY, SHARD_READY, logMemory } from "../utils/events-deno.ts";

const harmony = new Client({ token: TOKEN });

const harmonyStarted = Date.now();
let harmonyTime = Date.now();
let harmonyCounter = 1;

harmony
  .on("ready", () => {
    READY(harmonyStarted);
  })
  .on("shardReady", (id) => {
    harmonyTime = SHARD_READY(id, harmonyTime);
  })
  .on("messageCreate", (message) => {
    if (message.author.id !== OWNER_ID) return;
    if (message.content !== "!starttests") return;

    harmonyCounter = logMemory(
      Deno.memoryUsage(),
      harmonyCounter,
      "harmony",
      0,
      0,
      0,
      0
    );
    setInterval(() => {
      harmonyCounter = logMemory(
        Deno.memoryUsage(),
        harmonyCounter,
        "harmony",
        0,
        0,
        0,
        0
      );
    }, 60000);
  });

harmony.connect(TOKEN, [
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
