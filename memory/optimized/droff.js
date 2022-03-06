const { createClient, Intents, CacheTTLStore } = require("droff");
const Rx = require("rxjs");
const RxO = require("rxjs/operators");
const { TOKEN, OWNER_ID } = require("../../configs-node");
const { READY, SHARD_READY, logMemory } = require("../../utils/events-node");

const droffStarted = Date.now();
let droffTime = Date.now();
let droffCounter = 0;

const droff = createClient({
  token: TOKEN,
  gateway: {
    intents: Intents.DIRECT_MESSAGES | Intents.GUILD_MEMBERS | Intents.GUILD_MESSAGES | Intents.GUILDS,
  },
});

// Load caches
const second = 1000;
const minute = 60 * second;

const [guildsCache, guildsCache$] = droff.guildsCache(
  CacheTTLStore.createNonParent({
    ttl: 60 * minute,
  })
);
const [membersCache, membersCache$] = droff.membersCache(
  CacheTTLStore.create({
    ttl: 30 * minute,
    strategy: "activity",
  })
);
const [dmsCache, dmsCache$] = droff.directMessagesCache(
  CacheTTLStore.createNonParent({
    ttl: 10 * minute,
    strategy: "activity",
  })
);
const [messagesCache, messagesCache$] = droff.messagesCache(
  CacheTTLStore.create({
    ttl: 10 * minute,
    strategy: "activity",
  })
);
const [channelsCache, channelsCache$] = droff.channelsCache(
  CacheTTLStore.create({
    ttl: 61 * minute,
  })
);

// Start client and caches
Rx.merge(droff.effects$, guildsCache$, dmsCache$, messagesCache$, membersCache$, channelsCache$).subscribe();

// == Handlers

droff.fromDispatchWithShard("READY").subscribe(([, shard]) => {
  droffTime = SHARD_READY(shard.id[0], droffTime);
});

droff.gateway.shardsReady$.subscribe(() => {
  READY(droffStarted);
});

const starttests$ = droff.fromDispatch("MESSAGE_CREATE").pipe(
  RxO.filter((message) => message.content === "!starttests"),
  RxO.filter((message) => message.author.id === OWNER_ID)
);

// We only care about the command once
Rx.firstValueFrom(starttests$).then(() => {
  const tick = async () => {
    droffCounter = logMemory(
      process.memoryUsage(),
      droffCounter,
      "droff",
      await guildsCache.size(),
      await membersCache.size(),
      (await dmsCache.size()) + (await messagesCache.size()),
      await channelsCache.size()
    );
  };

  setInterval(tick, 60000);
  tick();
});
