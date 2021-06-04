import {
  startBot,
  cache,
  snowflakeToBigint,
} from "https://deno.land/x/discordeno/mod.ts";
import { TOKEN, OWNER_ID } from "../configs-deno.ts";
import { READY, SHARD_READY } from "../utils/events-deno.ts";

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
      READY(started);
    },
    shardReady(id) {
      time = SHARD_READY(id, time);
      // const here = Date.now();
      // console.log(`SHARD READY`, id, (here - time) / 1000, "seconds to start.");
      // time = here;
    },
    messageCreate(message) {
      if (
        message.authorId !== snowflakeToBigint(OWNER_ID) ||
        message.content !== "!starttests"
      )
        return;

      logMemory();
      setInterval(logMemory, 60000);
    },
  },
});

let ddcounter = 1;
function logMemory() {
  const usage = Deno.memoryUsage();
  const bytes = 1000000;
  // console.log(
  //   `[${counter} discordeno] Memory Usage RSS: ${
  //     usage.rss / bytes
  //   }MB Heap Used: ${usage.heapUsed / bytes}MB Heap Total: ${
  //     usage.heapTotal / bytes
  //   }MB | Guilds: ${cache.guilds.size} | Members: ${
  //     cache.members.size
  //   } | Messages: ${cache.messages.size} | Channels: ${cache.channels.size}`
  // );
  console.log({
    minutes: ddcounter,
    rss: usage.rss / bytes,
    heapUsed: usage.heapUsed / bytes,
    heapTotal: usage.heapTotal / bytes,
    lib: "discordeno",
    guilds: cache.guilds.size,
    members: cache.members.size,
    messages: cache.messages.size,
    channels: cache.channels.size,
  });
  ddcounter++;
}
