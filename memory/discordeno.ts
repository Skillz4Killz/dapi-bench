import { startBot, cache } from "https://deno.land/x/discordeno@11.0.0-rc.5/mod.ts";
import { TOKEN } from "../configs.ts";

const started = Date.now();
let time = Date.now();

startBot({
  token: TOKEN,
  intents: [
    "DirectMessageReactions",
    "DirectMessages",
    "GuildBans",
    "GuildEmojis",
    "GuildInvites",
    "GuildMembers",
    "GuildMessageReactions",
    "GuildMessages",
    "GuildVoiceStates",
    "Guilds",
  ],
  eventHandlers: {
    ready() {
      console.log(
        "Successfully connected to gateway",
        (Date.now() - started) / 1000,
        "seconds to start."
      );
      logMemory();
      setInterval(logMemory, 60000);
    },
    shardReady(id) {
      const here = Date.now();
      console.log(`SHARD READY`, id, (here - time) / 1000, "seconds to start.");
      time = here;
    },
  },
});

let counter = 1;
function logMemory() {
  const usage = Deno.memoryUsage();
  const bytes = 1000000;
  console.log(
    `[${counter} v11] Memory Usage RSS: ${usage.rss / bytes}MB Heap Used: ${
      usage.heapUsed / bytes
    }MB Heap Total: ${usage.heapTotal / bytes}MB | Guilds: ${
      cache.guilds.size
    } | Members: ${cache.members.size} | Messages: ${
      cache.messages.size
    } | Channels: ${cache.channels.size}`
  );
  counter++;
}
