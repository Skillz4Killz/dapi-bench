const { CommandClient } = require("detritus-client");
const { GatewayIntents } = require("detritus-client-socket/lib/constants");
const { TOKEN, OWNER_ID } = require("../configs-node");
const { READY, SHARD_READY, logMemory } = require("../utils/events-node");


const cache = {counter: 0, started: Date.now(), time: Date.now()};

const commandClient = new CommandClient(TOKEN, {
  prefix: '!',
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


let started = false;
commandClient.add({
  name: 'starttests',
  onBefore: (context) => context.userId === OWNER_ID,
  run: (context) => {
    logCacheSizes(context.client);
    if (!started) {
      started = true;
      setInterval(() => {
        logCacheSizes(context.client);
      }, 60000);
    }
  },
});


(async () => {
  const cluster = await commandClient.run();

  let shardsLoaded = 0;
  cluster.on('gatewayReady', (event) => {
    shardsLoaded++;

    cache.time = SHARD_READY(event.shard.shardId, cache.time);
    if (shardsLoaded === cluster.shardCount) {
      READY(cache.started);
    }
  });

  console.log(`Client has loaded with a shard count of ${cache.shardCount}`);
})();


function logCacheSizes(shardClient) {
  const counts = {channels: 0, guilds: 0, members: 0, messages: 0, users: 0};
  if (shardClient.cluster) {
    for (let [shardId, shard] of shardClient.cluster.shards) {
      addCacheSizes(shard, counts);
    }
  } else {
    addCacheSizes(shardClient, counts);
  }
  return cache.counter = logMemory(
    process.memoryUsage(),
    cache.counter,
    'detritus',
    counts.channels,
    counts.guilds,
    counts.members,
    counts.messages,
  );
}

function addCacheSizes(shard, counts) {
  counts.channels += shard.channels.length;
  counts.guilds += shard.guilds.length;
  counts.members += shard.members.length;
  counts.messages += shard.messages.length;
  counts.roles += shard.roles.length;
  counts.users += shard.users.length;
}
