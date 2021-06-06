# dapi-bench

[![Discord](https://img.shields.io/discord/785384884197392384?color=7289da&logo=discord&logoColor=dark)](https://discord.com/invite/5vBgXk3UcZ)

This is a simple benchmark comparing the current officially vetted libraries for JavaScript & TypeScript languages. Before, beginning setup you may need to install [**node**](https://nodejs.org/en/) or [**deno**](https://deno.land/#installation) or both.

It is impossible to have everyone test on the same system because each computer can be different. I recommend testing this in an environment that can be shared and used by anyone. The benchmarks below were conducted through [Github Codespaces](https://github.com/features/codespaces):

## Results

This benchmark comparison was run using a bot on approximately 10,000 servers.

### Startup Times

To make it easier to view, I have split the terminals into two groups. Group 1 is NodeJS libraries and Group 2 is Deno libraries.

![image](https://user-images.githubusercontent.com/23035000/120896894-9440d880-c5f1-11eb-8550-89f608340af6.png)

> Note: The error in eris is normal handling. This is not a bad thing. Sometimes discord will request at random to reconnect by requesting a reset.

![image](https://user-images.githubusercontent.com/23035000/120896898-999e2300-c5f1-11eb-9c54-7a0b4e41b0e1.png)

### Memory Management

The following data shows the first 5 minutes only. For the full 2 hour comparison please view it on our graphs.

> Note: This graph is representative of our first test which. A new graph will be posted once these benchmarks are complete.

[First 2hr Benchmarks](https://discordeno-benchmarks-graphs.pages.dev/)

| Library    | Minutes After Startup | RSS        | Heap Used  | Heap Total |
| ---------- | --------------------- | ---------- | ---------- | ---------- |
| Discordeno | 0                     | 233.785412 | 201.9401   | 234.160128 |
| Harmony    | 0                     | 216.281564 | 208.783428 | 217.120768 |
| Detritus   | 0                     | 494.309376 | 431.59512  | 434.249728 |
| Discord.js | 0                     | 581.435392 | 516.907208 | 519.51616  |
| Eris       | 0                     | 546.885632 | 464.588472 | 488.992768 |
| Discordeno | 1                     | 244.521668 | 211.8637   | 245.080064 |
| Harmony    | 1                     | 260.396144 | 230.049928 | 266.77248  |
| Detritus   | 1                     | 495.132672 | 432.779392 | 436.34688  |
| Discord.js | 1                     | 583.163904 | 519.522912 | 521.613312 |
| Eris       | 1                     | 517.820416 | 456.04032  | 458.719232 |
| Discordeno | 2                     | 231.322332 | 198.360944 | 231.501824 |
| Harmony    | 2                     | 426.158828 | 411.91562  | 427.35616  |
| Detritus   | 2                     | 495.243264 | 434.207408 | 437.65760  |
| Discord.js | 2                     | 585.93280  | 521.692624 | 523.710464 |
| Eris       | 2                     | 521.89184  | 459.644048 | 462.06976  |
| Discordeno | 3                     | 235.429388 | 204.383444 | 235.851776 |
| Harmony    | 3                     | 450.440452 | 414.107672 | 451.555328 |
| Detritus   | 3                     | 498.823168 | 436.269728 | 438.96832  |
| Discord.js | 3                     | 588.460032 | 523.955992 | 525.807616 |
| Eris       | 3                     | 525.225984 | 462.900248 | 465.682432 |
| Discordeno | 4                     | 237.70590  | 208.310496 | 238.268416 |
| Harmony    | 4                     | 485.688084 | 441.260448 | 486.567936 |
| Detritus   | 4                     | 506.679296 | 437.51016  | 440.541184 |
| Discord.js | 4                     | 589.979648 | 525.75072  | 528.166912 |
| Eris       | 4                     | 529.534976 | 466.01748  | 469.03296  |
| Discordeno | 5                     | 243.15398  | 216.152212 | 243.34336  |
| Harmony    | 5                     | 438.983272 | 424.298516 | 440.037376 |
| Detritus   | 5                     | 506.679296 | 437.51016  | 440.541184 |
| Discord.js | 5                     | 592.027648 | 528.709968 | 530.497536 |
| Eris       | 5                     | 532.365312 | 469.047128 | 472.121344 |

## Analysis

For any benchmarks to be held as viable, they must be observable and repeatable. This is essential to make sure there is true validity. Furthermore, the tests should be done in a neutral place which can be shared by anyone. This benchmark makes use of Github Codespaces as it can be used by anyone, and it would use the same environment and specs to make sure the benchmarks are conducted with minimal variables.

Based on the benchmarks above, it is my opinion that the best and most scalable library is **Discordeno**.

### Startup & Scalability

First we can discuss the startup times. To really understand this portion of the benchmarks, it is important to remember that the test was conducted with a bot around ~10,000 servers. This was intentionally done so it could make it easier for us to do math to see the effects of this difference. It is also important to remember that those stats are not exactly the same each time, they can differ based on many variables such as network latency. You will see an average increase or decrease of about 5 second difference. If we were to assume that the times shown above are the average and use those to analyze the effect at scale, here is how it would go.

Discordeno started up at **57.262 seconds**. This means it took on average, **5.7262 seconds** per shard to startup.
Harmony started up at **81.543 seconds**. This means it took on average, **8.1543 seconds** per shard to startup.
Detritus started up at **79.232 seconds**. This means it took on average, **7.9232 seconds** per shard to startup.
Discord.js started up at **81.029 seconds**. This means it took on average, **8.1029 seconds** per shard to startup.
Eris started up at **81.709 seconds**. This means it took on average, **8.1709 seconds** per shard to startup.

**Discordeno**

If you are using Discordeno:

- 10,000 servers, with a total of **57.262 seconds**.
- 100,000 servers, with a total of **572.62 seconds** which is about 9 minutes.
- 1,000,000 servers is a bit special in Discordeno, here you will be automatically updated to the advanced sharding using concurrent buckets which would allow you to start up much faster. An estimated time of about **5.9648 minutes**.

**Harmony**

If you are using Harmony, instead of Discordeno:

- 10,000 servers, with a total of **81.543 seconds**, Harmony is **24.281 seconds** slower.
- 100,000 servers, with a total of **815.43 seconds**, Harmony is **242.81** seconds slower which is about **4 minute**.
- 1,000,000 servers, with a total of **8154.3 seconds**, Harmony is **7796.4125** seconds slower which is about **129.9402 minutes**.

**Detritus**

If you are using Detritus, instead of Discordeno:

- 10,000 servers, with a total of **79.232 seconds**, Detritus is **24.281 seconds** slower.
- 100,000 servers, with a total of **815.43 seconds**, Detritus is **242.81 seconds** slower which is about **4 minutes**.
- 1,000,000 servers is a bit special in Detritus, here you will be automatically updated to the advanced sharding using concurrent buckets which would allow you to start up much faster. An estimated time of about **8.25333 minutes**.

**Discord.JS**

- 10,000 servers, with a total of **81.029 seconds**, Discord.JS is **23.767 seconds** slower.
- 100,000 servers, with a total of **810.29 seconds**, Discord.JS is **237.67** seconds slower which is about **3.9 minutes**.
- 1,000,000 servers, with a total of **8102.9 seconds**, Discord.JS is **7745.0125** seconds slower which is about **129.0835 minutes**.

**Eris**

- 10,000 servers, with a total of **81.709 seconds**, Eris is **24.447 seconds** slower.
- 100,000 servers, with a total of **817.09 seconds**, Eris is **244.47** seconds slower which is about **4.0745 minutes**.
- 1,000,000 servers, with a total of **8170.9 seconds**, Eris is **7813.0125** seconds slower which is about **130.2169 minutes**.

Comparing the startup times for the libraries, we see that Discordeno is ahead by quite a bit. Nonetheless, this difference is almost invisible for the average small bot. If you do wish to scale up grow your bot, your best choice is obviously something that will scale with your bot. Detritus comes a close second. A 3 minute difference for starting up 1 million shards is almost nothing in reality, if you prefer the Detritus libraries API.

The time to startup is not the only aspect to look at in terms of scalability. Discordeno also supports having a proxy/standalone websocket/gateway process. This allows you to have the following benefits:

- **Zero Downtime Updates**:

  - Your bot can be updated in a matter of seconds. With normal sharding, you
    have to restart which also has to process identifying all your shards with a
    1/~5s rate limit. With WS handling moved to a proxy process, this allows you
    to instantly get the bot code restarted without any concerns of delays. If
    you have a bot on 200,000 servers normally this would mean a 20 minute delay
    to restart your bot if you made a small change and restarted.

- **Zero Downtime Resharding**:

  - Discord stops letting your bot get added to new servers at certain points in
    time. For example, suppose you had 150,000 servers running 150 shards. The
    maximum amount of servers your shards could hold is 150 \* 2500 = 375,000. If
    your bot reaches this, it can no longer join new servers until it re-shards.
  - DD proxy provides 2 types of re-sharding. Automated and manual. You can also
    have both.
    - `Automated`: This system will automatically begin a Zero-downtime
      resharding process behind the scenes when you reach 80% of your maximum
      servers allowed by your shards. For example, since 375,000 was the max, at
      300,000 we would begin re-sharding behind the scenes with `ZERO DOWNTIME`.
      - 80% of maximum servers reached (The % of 80% is customizable.)
      - Identify limits have room to allow re-sharding. (Also customizable)
    - `Manual`: You can also trigger this manually should you choose.

- **Horizontal Scaling**:

  - The proxy system allows you to scale the bot horizontally. When you reach a
    huge size, you can either keep spending more money to keep beefing up your
    server or you can buy several cheaper servers and scale horizontally. The
    proxy means you can have WS handling on a completely separate system.

- **No Loss Restarts**:

  - When you restart a bot without the proxy system, normally you would lose
    many events. Users may be using commands or messages are sent that will not
    be filtered. As your bot's grow this number rises dramatically. Users may
    join who wont get the auto-roles or any other actions your bot should take.
    With the proxy system, you can keep restarting your bot and never lose any
    events. Events will be put into a queue while your bot is down(max size of
    queue is customizable), once the bot is available the queue will begin
    processing all events.

> Note: There is no 1 perfect library! Discordeno is not some magical wonder drug that no one else can replicate. It is just code. With JavaScript/TypeScript, you can accomplish any of this as well in those other libraries. Anyone who wishes can optimize any of these libraries and achieve the same results. The goal of these benchmarks and analysis is to compare and contrast which is the ideal library for scaling in terms of the libraries default behaviors, so it does not require the hackwork or forking and modifying but that it just works from the get go.

### Analyzing The Memory Management

// TODO: add once the benchmarks are done

## Setup

1. Create `configs-deno.ts` file and paste the following:

```ts
// ADD YOUR BOT TOKEN
export const TOKEN = "";
// ADD YOUR ID INSTEAD OF MINE
export const OWNER_ID = "130136895395987456";
```

2. Create `configs-node.js` file and paste the following:

```js
// ADD YOUR BOT TOKEN
exports.TOKEN = "";
// ADD YOUR ID INSTEAD OF MINE
exports.OWNER_ID = "130136895395987456";
```

3. Install needed node packages `npm install`

4. Open 5(as many libraries you want to test) different terminal side by side so you can see them all.

5. In each one you can run the following commands for each library:

```shell
npm run discordeno
npm run harmony
npm run discordjs
npm run eris
npm run detritus
```

6. Wait and watch the logs to track startup times.

7. Once all libraries are fully ready, go into a channel and type `!starttests` to begin logging memory.

> Note: Do NOT start up every library at once, wait for each library one at a time to start all your shards. Remember your bot has a identify rate limit which needs to be respected. Due to this delay, you may have a slightly higher memory count on libraries that are started earlier as they will have received more events coming in while waiting for other libraries to fully start.

## Contribute

If you wish to help improve the benchmarks or add more benchmarks, please feel free to send a Pull Request or contact me on Discord at https://discord.gg/ddeno

## Apologies

Certain statistics, for example the amount of guilds in cache, are missing in certain libraries because the design of the library makes it incredibly difficult compared to other libraries to determine those values. Some libraries, didn't even make it possible to check this at all. If you understand those libraries and wish to add them, please help me improve it and send a Pull Request.

If I have made a mistake in optimizing your library, please forgive me. My intent was not to make any library look bad intentionally. Please, help me improve your library benchmarks with a Pull Request. I tried my very best to make every library on an equal footing. But if I have made a mistake, I apologize.
