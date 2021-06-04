const { CommandClient } = require("detritus-client");
const { GatewayIntents } = require("detritus-client-socket/lib/constants");
const { TOKEN, OWNER_ID } = require("../configs-node");

const started = Date.now();
let time = Date.now();

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
  console.log(
    "Successfully connected to gateway",
    (Date.now() - started) / 1000,
    "seconds to start."
  );
});

let counter = 1;
function logMemory() {
  const usage = process.memoryUsage();
  const bytes = 1000000;
  console.log(
    `[${counter} detritus] Memory Usage RSS: ${
      usage.rss / bytes
    }MB Heap Used: ${usage.heapUsed / bytes}MB Heap Total: ${
      usage.heapTotal / bytes
    }MB`
  );
  counter++;
}

(async () => {
  const client = await commandClient.run();
  client.on("ready", () => {
    console.log(
      "Successfully connected to gateway",
      (Date.now() - started) / 1000,
      "seconds to start."
    );

    logMemory();
    setInterval(logMemory, 60000);
  });

  let shardsLoaded = 0;

  client.on("message", (message) => {
    if (
      message.authorId === snowflakeToBigint(OWNER_ID) ||
      message.content !== "!starttests"
    )
      return;

    logMemory();
    setInterval(logMemory, 60000);
  });

  client.on("gatewayReady", (id) => {
    shardsLoaded++;
    const here = Date.now();
    console.log(
      `SHARD READY`,
      id.raw.shard,
      (here - time) / 1000,
      "seconds to start."
    );
    time = here;

    if (shardsLoaded === 10) {
      console.log(
        "Successfully connected to gateway",
        (Date.now() - started) / 1000,
        "seconds to start."
      );

      logMemory();
      setInterval(logMemory, 60000);
    }
  });

  // client has received the READY payload, do stuff now
  console.log(`Client has loaded with a shard count of ${client.shardCount}`);
})();
