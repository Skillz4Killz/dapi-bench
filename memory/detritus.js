const { CommandClient } = require("detritus-client");
const { GatewayIntents } = require("detritus-client-socket/lib/constants");
const { TOKEN, OWNER_ID } = require("../configs-node");
const { READY, SHARD_READY, logMemory } = require("../utils/events-node");

const detritusStarted = Date.now();
let detritusTime = Date.now();
let detritusCounter = 0;

const commandClient = new CommandClient(TOKEN, {
  prefix: "asdgwq43ewfae3fwawev",
  gateway: {
    intents: [
      GatewayIntents.DIRECT_MESSAGE_REACTIONS,
      GatewayIntents.DIRECT_MESSAGES,
      GatewayIntents.GUILD_BANS,
      GatewayIntents.GUILD_EMOJIS,
      GatewayIntents.GUILD_INVITES,
      GatewayIntents.GUILD_MEMBERS,
      GatewayIntents.GUILD_MESSAGE_REACTIONS,
      GatewayIntents.GUILD_MESSAGES,
      GatewayIntents.GUILD_VOICE_STATES,
      GatewayIntents.GUILDS,
    ],
  },
});

commandClient.on("ready", () => {
  READY(detritusStarted);
});

(async () => {
  const detritus = await commandClient.run();
  detritus.on("ready", () => {
    READY(detritusStarted);
  });

  let shardsLoaded = 0;

  detritus.on("messageCreate", (message) => {
    if (message.message.author.id !== OWNER_ID) return;
    if (message.message.content !== "!starttests") return;

    detritusCounter = logMemory(
      process.memoryUsage(),
      detritusCounter,
      "detritus",
      0,
      0,
      0,
      0
    );
    setInterval(() => {
      detritusCounter = logMemory(
        process.memoryUsage(),
        detritusCounter,
        "detritus",
        0,
        0,
        0,
        0
      );
    }, 60000);
  });

  detritus.on("gatewayReady", (id) => {
    shardsLoaded++;
    detritusTime = SHARD_READY(id.raw.shard[0], detritusTime);

    if (shardsLoaded === 10) {
      READY(detritusStarted);
    }
  });

  // detritus has received the READY payload, do stuff now
  console.log(`Client has loaded with a shard count of ${detritus.shardCount}`);
})();
