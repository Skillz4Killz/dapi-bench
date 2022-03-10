const { createClient, Intents } = require("droff");
const Rx = require("rxjs");
const RxO = require("rxjs/operators");
const { TOKEN, OWNER_ID } = require("../configs-node");
const { READY, SHARD_READY, logMemory } = require("../utils/events-node");

const droffStarted = Date.now();
let droffTime = Date.now();
let droffCounter = 0;

const droff = createClient({
  token: TOKEN,
  gateway: {
    intents:
      Intents.DIRECT_MESSAGE_REACTIONS |
      Intents.DIRECT_MESSAGES |
      Intents.GUILD_BANS |
      Intents.GUILD_EMOJIS_AND_STICKERS |
      Intents.GUILD_INVITES |
      Intents.GUILD_MEMBERS |
      Intents.GUILD_MESSAGE_REACTIONS |
      Intents.GUILD_MESSAGES |
      Intents.GUILD_VOICE_STATES |
      Intents.GUILDS,
  },
});

// Load caches
const [guildsCache, guildsCache$] = droff.guildsCache();
const [membersCache, membersCache$] = droff.membersCache();
const [dmsCache, dmsCache$] = droff.directMessagesCache();
const [messagesCache, messagesCache$] = droff.messagesCache();
const [channelsCache, channelsCache$] = droff.channelsCache();

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
      (await messagesCache.size()) + (await dmsCache.size()),
      await channelsCache.size()
    );
  };

  setInterval(tick, 60000);
  tick();
});
