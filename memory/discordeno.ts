import {
  startBot,
  cache,
  snowflakeToBigint,
} from "https://deno.land/x/discordeno/mod.ts";
import { TOKEN, OWNER_ID } from "../configs-deno.ts";
import { READY, SHARD_READY, logMemory } from "../utils/events-deno.ts";

const started = Date.now();
let time = Date.now();
let ddcounter = 0;

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

      logMemory(
        Deno.memoryUsage(),
        ddcounter,
        "discordeno",
        cache.guilds.size,
        cache.members.size,
        cache.messages.size,
        cache.channels.size
      );
      setInterval(() => {
        logMemory(
          Deno.memoryUsage(),
          ddcounter,
          "discordeno",
          cache.guilds.size,
          cache.members.size,
          cache.messages.size,
          cache.channels.size
        );
      }, 60000);
    },
  },
});
