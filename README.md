# dapi-bench

[![Discord](https://img.shields.io/discord/785384884197392384?color=7289da&logo=discord&logoColor=dark)](https://discord.com/invite/5vBgXk3UcZ)

Contact: Want to chat? Hit me up on my [Discord server](https://discord.gg/ddeno)

This is a simple benchmark comparing the current officially vetted libraries for JavaScript & TypeScript languages. Before, beginning setup you may need to install [**node**](https://nodejs.org/en/) or [**deno**](https://deno.land/#installation) or both.

It is impossible to have everyone test on the same system because each computer can be different. I recommend testing this in an environment that can be shared and used by anyone. The benchmarks below were conducted through [Github Codespaces](https://github.com/features/codespaces):

## Libraries

Discordeno: [Github](https://github.com/discordeno/discordeno) [Discord Server](https://discord.gg/ddeno)

Harmony: [Github](https://github.com/harmonyland/harmony) [Discord Server](https://discord.gg/harmony)

Detritus: [Github](https://github.com/detritusjs/client) [Discord Server](https://discord.gg/detritus)

Discord.JS: [Github](https://github.com/discordjs/discord.js) [Discord Server](https://discord.gg/djs)

Eris: [Github](https://github.com/abalabahaha/eris) [Discord Server](https://discord.gg/eris)

---

- Discordeno 11.0.0 was used.
- Harmony v2.0.0-rc2 was used. The stable v1 was not useable at this scale as it was taking almost 10 minutes to load per shard. Instead the latest release candidate of v2 was used after discussing with the library developers.
- Discord.js 12.5.3 was used.
- Detritus 0.15.0 was used.
- Eris 0.15.1 was used.

## Results

This benchmark comparison was run using a bot on approximately 10,000 servers.

### Startup Times

To make it easier to view, I have split the terminals into two groups. Group 1 is NodeJS libraries and Group 2 is Deno libraries.

![image](https://user-images.githubusercontent.com/23035000/120896894-9440d880-c5f1-11eb-8550-89f608340af6.png)

> Note: The error in eris is normal handling. This is not a bad thing. Sometimes discord will request at random to reconnect by requesting a reset.

![image](https://user-images.githubusercontent.com/23035000/120896898-999e2300-c5f1-11eb-9c54-7a0b4e41b0e1.png)

### Memory Management

The following data shows the first 5 minutes only. For the full 2 hour comparison please view it on our graphs.

> Note: Please view it on a bigger screen, like a computer. CSS is hard!

[2hr Benchmarks](https://discordeno-benchmarks-graphs.pages.dev/)

**Discordeno**

| Minutes After Startup | RSS (MB)   | Heap Used (MB) | Heap Total (MB) |
| --------------------- | ---------- | -------------- | --------------- |
| 0                     | 243.892576 | 208.527604     | 244.674560      |
| 1                     | 238.730048 | 202.430928     | 239.702016      |
| 2                     | 246.497220 | 210.334392     | 248.807424      |
| 3                     | 237.541040 | 203.351572     | 238.129152      |
| 4                     | 246.08500  | 213.372156     | 246.587392      |
| 5                     | 239.712308 | 205.979200     | 240.283648      |

**Harmony**

| Minutes After Startup | RSS (MB)   | Heap Used (MB) | Heap Total (MB) |
| --------------------- | ---------- | -------------- | --------------- |
| 0                     | 331.283288 | 320.532956     | 331.857920      |
| 1                     | 410.668220 | 397.410528     | 411.328512      |
| 2                     | 408.612040 | 395.192964     | 409.112576      |
| 3                     | 412.030844 | 398.567096     | 412.950528      |
| 4                     | 413.367692 | 399.790460     | 414.212096      |
| 5                     | 413.902848 | 400.104840     | 414.736384      |

**Detritus**

| Minutes After Startup | RSS (MB)   | Heap Used (MB) | Heap Total (MB) |
| --------------------- | ---------- | -------------- | --------------- |
| 0                     | 497.319936 | 433.726328     | 436.084736      |
| 1                     | 499.625984 | 435.320352     | 437.919744      |
| 2                     | 500.158464 | 436.297120     | 438.706176      |
| 3                     | 501.510144 | 436.986304     | 440.016896      |
| 4                     | 505.348096 | 438.864856     | 441.065472      |
| 5                     | 508.149760 | 439.632352     | 442.638336      |

**Discord.JS**

| Minutes After Startup | RSS (MB)   | Heap Used (MB) | Heap Total (MB) |
| --------------------- | ---------- | -------------- | --------------- |
| 0                     | 570.343424 | 505.966424     | 509.554688      |
| 1                     | 571.633664 | 508.051432     | 509.554688      |
| 2                     | 572.534784 | 509.159704     | 511.651840      |
| 3                     | 574.488576 | 511.238200     | 513.748992      |
| 4                     | 584.093696 | 520.679512     | 522.452992      |
| 5                     | 586.240000 | 522.365640     | 524.288000      |

**Eris**

| Minutes After Startup | RSS (MB)   | Heap Used (MB) | Heap Total (MB) |
| --------------------- | ---------- | -------------- | --------------- |
| 0                     | 513.777664 | 455.092768     | 457.932800      |
| 1                     | 517.099520 | 458.638728     | 460.759040      |
| 2                     | 520.23296  | 461.341152     | 464.371712      |
| 3                     | 525.213696 | 465.054648     | 467.460096      |
| 4                     | 527.712256 | 467.69908      | 470.810624      |
| 5                     | 530.649088 | 470.680552     | 473.636864      |

## Analysis

For any benchmarks to be held as viable, they must be observable and repeatable. This is essential to make sure there is true validity. Furthermore, the tests should be done in a neutral place which can be shared by anyone. This benchmark makes use of Github Codespaces as it can be used by anyone, and it would use the same environment and specs to make sure the benchmarks are conducted with minimal variables.

Based on the benchmarks above, the best and most scalable library is **Discordeno** so we will use it as the comparison point for all other libraries below.

### Startup & Scalability

First we can discuss the startup times. To really understand this portion of the benchmarks, it is important to remember that the test was conducted with a bot around ~10,000 servers. This was intentionally done so it could make it easier for us to do math to see the effects of this difference. It is also important to remember that those stats are not exactly the same each time, they can differ based on many variables such as network latency. You will see an average increase or decrease of about 5 second difference. If we were to assume that the times shown above are the average and use those to analyze the effect at scale, here is how it would go.

- Discordeno started up at **57.262 seconds**. This means it took on average, **5.7262 seconds** per shard to startup.
- Harmony started up at **81.543 seconds**. This means it took on average, **8.1543 seconds** per shard to startup.
- Detritus started up at **79.232 seconds**. This means it took on average, **7.9232 seconds** per shard to startup.
- Discord.js started up at **81.029 seconds**. This means it took on average, **8.1029 seconds** per shard to startup.
- Eris started up at **81.709 seconds**. This means it took on average, **8.1709 seconds** per shard to startup.

**Discordeno**

Since this is the fastest library, there is nothing to compare it to.

- 10,000 servers, with a total of **57.262 seconds**.
- 100,000 servers, with a total of **572.62 seconds** which is about 9 minutes.
- 1,000,000 servers is a bit special in Discordeno, here you will be automatically updated to the advanced sharding using concurrent buckets which would allow you to start up much faster. An estimated time of about **5.9648 minutes**.

**Harmony**

- 10,000 servers, with a total of **81.543 seconds**, Harmony is **24.281 seconds** slower.
- 100,000 servers, with a total of **815.43 seconds**, Harmony is **242.81** seconds slower which is about **4 minute**.
- 1,000,000 servers, with a total of **8154.3 seconds**, Harmony is **7796.4125** seconds slower which is about **129.9402 minutes**.

**Detritus**

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

> Note: I saw no mention of support for large bots concurrent buckets when searching through the code for Harmony, Discord.JS, and Eris libraries.

Comparing the startup times for the libraries, we see that Discordeno is ahead by quite a bit. Nonetheless, this difference is almost invisible for the average small bot. If you do wish to scale up grow your bot, your best choice is obviously something that will scale with your bot. Detritus comes a close second. A 3 minute difference for starting up 1 million shards is almost nothing in reality, if you prefer the Detritus libraries API.

The time to startup is not the only aspect to look at in terms of scalability. After speaking to some of the developers of the biggest JS/TS bots, you begin to see a pattern of users unhappy with the current state of JS/TS libraries. They are no longer able to help them scale easily and are starting to move away to other libraries or having to make their own libraries because they need to be able to make their bot distributed. For example, having a proxy/standalone websocket/gateway process. This allows you to have the following benefits:

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

Not only can you have the gateway implementation as a standalone process, you can also separate many other things into standalone processes such as slash commands, event handlers, the REST manager and more. Because of these reasons and the data above, Discordeno appears to be the most scalable library. From the current state of these libraries, Discordeno is the only library to provide this ability to scale by allowing a distributed bot if desired.

#### Shortcomings Noticed

There were a few things I noticed during the test.

- Discord.JS has an interesting 23 second load time on shard 5. I am not sure of the reason for this, my current assumption is that it happens because one of those servers may be huge and it takes a long time to set it up. Oddly enough, the next shard starts in <1 second so it is quite weird.
- Harmony also seems to have a spike in load time for certain shards. Sometimes, this will spike to 2-3 seconds higher than other shards. Detritus, Eris, and Discordeno are usually pretty consistent.
- Detritus seems to spawn shards at random instead of a clean order. This makes it a bit annoying to be able to determine if a shard didn't spawn or not. It is not a huge deal, but would be nicer to have this sorted. Discord.JS also has this happen in a few rare instances. Not sure of the cause.
- Harmony is the only lib that seems to emit shard readys even after all shards have gone ready. Not a big deal, but is interesting to see.
- Eris seems to crash the bot entirely if you don't have an error event listener for when discord normally/routinely sends a request to reset the connection. Harmony does not crash the bot, but it does have an big ugly error in the logs. Remember these errors, are not bad but they can be handled silently or opted into a debug event.

> Note: There is no 1 perfect library! Discordeno is not some magical wonder drug that no one else can replicate. It is just code. With JavaScript/TypeScript, you can accomplish any of this as well in those other libraries. Anyone who wishes can optimize any of these libraries and achieve the same results. The goal of these benchmarks and analysis is to compare and contrast which is the ideal library for scaling in terms of the libraries default behaviors, so it does not require the hackwork or forking and modifying but that it just works from the get go.

### Analyzing The Memory Management

In terms of memory management, based on the benchmarks, once again the library performing the best, is Discordeno so we will use it as the comparison point for all other libraries below.

There are a few key things to note when it comes to understanding how this test was conducted. This is not a test of memory storage but the management of memory. This means that libraries were not storing the exact same values at all given points in time. Ideally, I would love for someone to add that benchmark as well but that is incredily complex to achieve.

To understand why each library is slightly different in statistics of their cached values, it is important to look from the starting point. For example, Discordeno was the first library that started up. Then Harmony was started which took 80 seconds, this meant Discordeno already received 80 seconds worth of events. Then Detritus > Discord.js and finally Eris was started up. This means that certain libraries had more events than other. This was the only possible way to make sure that all libraries were experiencing the similar events as close as possible. If you look closely at the results you will see this in effect where Discordeno has more users/messages in cache than other libraries. This makes sense. This is NOT an issue with the other libraries!

However, there is a issue with the Harmony library. They are missing several thousands of users altogether from the start to the end of the benchmark. After speaking to the developers of the library, I was able to confirm that they do not do any optimizations but this is indeed an issue in the library itself.

This meant that it was slightly acceptable that the libraries that were started up first, were going to have a slightly higher memory usage because they received a little more events.

#### Speed Performance

Interestingly, we noticed that all of the libraries performed almost exactly the same except for Harmony. Harmony was a lot slower compared to the others, I would estimate it was almost 20-30 seconds slower to log the values. There may be several reasons behind this but my main assumption after looking at the code is the design of the libraries cache managers. The only way to determine the amount of items in cache is to do a hackish solution since there is no quick lookup like other libraries. For example, to get the total guilds in cache:

```ts
// Discordeno
cache.guilds.size
// Discord.js
client.guilds.size

// Harmony
(await harmony.guilds.array()).length,
```

This design makes it much more complicated to use this library and slows down something as simple as checking cached values. Challenge yourself to see if you can figure out how to calculate the number of messages are cached using this design. Is it possible? Sure, but it is extremely complicated that even after asking the libraries developers I was not given a solution.

The concern from this is, imagine you have a bot that shows your bots stats or about command that shows your cached values. This would mean you would have a 20-30 second delay for simple commands just to get that for 10,000 servers. But what if this scaled to 100,000 servers. This would now be 200-300 seconds or 3-5 minutes. If this rose to 1,000,000 servers you would be talking about a 30-50 minute delay.

#### Understanding The Terminology

There is a great [article by log rocket](https://blog.logrocket.com/understanding-memory-leaks-node-js-apps/) that helps explain this in a really easy to understand way.

![image](https://user-images.githubusercontent.com/23035000/120937860-ebbc7280-c6dd-11eb-84cd-5b4f3bce633a.png)

#### Instant Insights

At first glance, it can be understood that the libraries that best manage memory at the start are as follows:

1. Discordeno
2. Harmony
3. Detritus
4. Eris
5. Discord.JS

However, as we take a closer look at the data values for the initial values, we notice that Harmony is missing thousands of users. At the start, harmony had only cached `456` users. As a comparison:

Discordeno: `2624`

Harmony: `456`

Detritus: `2299`

Discord.JS: `1940`

Eris: `1671`

Please, note once again the difference here between the 4 libraries is understandable because the list shows the order in which they started and received more events than the lower ones. However, Harmony is way too low and is missing 1000s of users from the get go. And is always lower than the libraries even after it. This means that Harmony is not properly caching data that are coming in from the websocket. The concern here is that if this library is reflecting the cached values correctly, as discussed with the library developer. Since Harmony has almost 1/4 the users of other libraries, how much higher would the library be if it was caching all users equally? The only reasonable assumption that in terms of memory management at the start the most accurate order would be:

1. Discordeno
2. Detritus
3. Eris
4. Discord.JS
5. Harmony

---

Another intersting thing, we noticed about Harmony, was that in the start of the benchmarks, it was the only library to skyrocket in terms of memory compared to the others that remained relatively stable. Harmony spiked almost 100MB of memory in the first minute.

#### Stability

If you look at the bigger picture for the duration of the 2 hours of testing, you will see that Discordeno appears to be the most stable when it comes to RSS. According to LogRocket article linked above, "If you suspect a memory leak in your application, chances are high that it could be a result of the uncapped increase in the app’s resident set size (RSS), which makes it rise without leveling off. As a result, the RSS becomes too high for the application to handle the workload, which could cause it to crash without an “out of memory” warning." This goes to hint that, Harmony, Detritus, Discord.js and Eris have built in memory leaks by default. Over time, they will continue to increase the amount of memory that they need.

Most likely, the reason that these libraries have this infinitely growing memory usage is because they do not enable sweeping unused cached values. Infinitely growing memory usage is a leak. A lot of developers, are not aware of these options nor do they even know to enable them. I have personally met a developer who had a basic bot at 800MB on a single server by just leaving it online. More than likely, each library should be doing it's very best by default. This benchmark shows each library as is, no modifications, no nothing with the same intents. If some library, was caching members twice internally, it would not be a fair benchmark to then go and implement and optimized version of their library in order to benchmark it. Similarily, its also unfair for me to modify any other libraries defaults. Remember, this benchmark is a benchmark to show the how each library manages memory usage and not how each library stores memory using the same exact objects.

I would love developers to reach out and implement another test for that benchmark that would share the same caching policies instead of the defaults. This is way to complicated to figure out for each library as I did not write those libraries. I have added an `memory/optimized` folder showing the caching policies we can all share. However, I do not believe that these new tests will show much of a difference for a few reasons. The start of the benchmarks for the first few minutes where no library will have been able to remove anything show the differences being almost the exact same as during the entire benchmark. Because of this I have also taken the time to showcase/highlight the first 5 minutes above in a table.

Discord.JS and Eris are relatively the same stability wise. Detritus seems to be increasing slightly every minute but at a much slower rate compared to Discord.JS and Eris. Harmony seems to have been very unstable throughout the test but over time, you can see a consistent increase in memory being used.

#### Best Cache Gathering

Detritus is the best library in terms of which library can cache the most amount of data coming in from the same events. During the entire benchmark, it was consistently obvious that Detritus was increasing much more rapidly in cached users which goes to show that their handling of events and caching is better than everyone. At certain minutes you could easily see Detritus having gained several hundreds more users as opposed to the other libraries.

#### Understanding The Drops

There are times in each libraries results, you can see where memory slightly falls off. This happens for several reasons. One could be the garbage collector is running for that process at the moment and cleaned up some memory. Another reason could be that some sort of default sweeper is running that cleaned up some memory.

There are two big drops we should probably take a minute to discuss.

- At minute 33 of the benchmark, Harmony drops from 443MB to 229MB. I have been unable to determine what caused this especially when right afterwards, it seemed to spike even higher then before.

- At minute 58 of the benchmark, Discordeno drops from 234MB to 101MB. This is reflecting the guilds sweeper running. Discordeno has a feature I call dispatchRequirements which allows us to determine any unused data in cache and remove them. This allows us to remove almost 85% of the data in memory. When this data is needed again, Discordeno dispatchRequirements triggers allowing it to be added back so you as the end user has no effect.

#### Analyzing The Differences

I have not done a deep dive of every library to determine each and every difference in every library to understand why each library has different amounts of memory. I have noticed a few things that were recommended to me by a friend.

- Discordeno implements BigInts instead of Strings for any snowflakes. This saves quite a lot of memory.
- Discordeno does not store booleans, instead it opts for storing bitwise flags.
- Discordeno does not store avatar/icon hashes as strings but instead stores them as BigInts.
- Discordeno stores discriminators as a Number not a string.
- Discordeno is written in a functional no-class based oop design. A great read [object-oriented-programming-the-trillion-dollar-disaster](https://betterprogramming.pub/object-oriented-programming-the-trillion-dollar-disaster-92a4b666c7c7). I have not been able to verify this as a main reason yet, but as shown by other projects who have switched from classes to no classes.

![image](https://user-images.githubusercontent.com/23035000/120937834-bf085b00-c6dd-11eb-8e0b-426a97394bd7.png)

> Note: There is no 1 perfect library! Discordeno is not some magical wonder drug that no one else can replicate. It is just code. With JavaScript/TypeScript, you can accomplish any of this as well in those other libraries. Anyone who wishes can optimize any of these libraries and achieve the same results. The goal of these benchmarks and analysis is to compare and contrast which is the ideal library for scaling in terms of the libraries default behaviors, so it does not require the hackwork or forking and modifying but that it just works from the get go.

## Thank You

Thank you for taking the time to read this. Thank you to those who helped contribute to this. Thank you to those who helped me think through this by helping me bounce the ideas off of you. Thank you to everyone who helped in anyway that I did not remember. Thank you Discord for making an awesome API.

## Final Notes

Rust > \*. There is a Rust library going even more above and beyond but their developer asked me not to mention them in this so I have respected their wish and left them out of this analysis. After that I decided to keep this benchmark to only JS/TS libraries.

> Note: There is no 1 perfect library! Discordeno is not some magical wonder drug that no one else can replicate. It is just code. With JavaScript/TypeScript, you can accomplish any of this as well in those other libraries. Anyone who wishes can optimize any of these libraries and achieve the same results. The goal of these benchmarks and analysis is to compare and contrast which is the ideal library for scaling in terms of the libraries default behaviors, so it does not require the hackwork or forking and modifying but that it just works from the get go.

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
