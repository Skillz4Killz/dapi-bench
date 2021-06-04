import { Client } from "https://github.com/discordeno/university/blob/main/mod.ts";
import { TOKEN, OWNER_ID } from "../configs-deno.ts";
import { READY, SHARD_READY, logMemory } from "../utils/events-deno.ts";

const universityStarted = Date.now();
let universityTime = Date.now();
let universitycounter = 0;

const university = new Client({
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
});

university
  .on("ready", () => {
    READY(universityStarted);
  })
  .on("shardReady", (id) => {
    universityTime = SHARD_READY(id, universityTime);
  })
  .on("message", (message) => {
    if (message.author.id !== OWNER_ID || message.content !== "!starttests")
      return;

    universitycounter = logMemory(
      Deno.memoryUsage(),
      universitycounter,
      "university",
      university.guilds.size,
      university.members.size,
      university.messages.size,
      university.channels.size
    );
    setInterval(() => {
      universitycounter = logMemory(
        Deno.memoryUsage(),
        universitycounter,
        "university",
        university.guilds.size,
        university.members.size,
        university.messages.size,
        university.channels.size
      );
    }, 60000);
  });

university.connect();
