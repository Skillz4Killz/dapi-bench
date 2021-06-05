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

| Library    	| Minutes After Startup 	| RSS        	| Heap Used  	| Heap Total 	|
|------------	|-----------------------	|------------	|------------	|------------	|
| Discordeno 	| 0                     	| 233.785412 	| 201.9401   	| 234.160128 	|
| Harmony    	| 0                     	| 216.281564 	| 208.783428 	| 217.120768 	|
| Detritus   	| 0                     	| 494.309376 	| 431.59512  	| 434.249728 	|
| Discord.js 	| 0                     	| 581.435392 	| 516.907208 	| 519.51616  	|
| Eris       	| 0                     	| 546.885632 	| 464.588472 	| 488.992768 	|
| Discordeno 	| 1                     	| 244.521668 	| 211.8637   	| 245.080064 	|
| Harmony    	| 1                     	| 260.396144 	| 230.049928 	| 266.77248 	|
| Detritus   	| 1                     	| 495.132672 	| 432.779392 	| 436.34688 	|
| Discord.js 	| 1                     	| 583.163904 	| 519.522912 	| 521.613312  	|
| Eris       	| 1                     	| 517.820416 	| 456.04032 	| 458.719232 	|
| Discordeno 	| 2                     	| 231.322332 	| 198.360944   	| 231.501824 	|
| Harmony    	| 2                     	| 426.158828 	| 411.91562 	| 427.35616 	|
| Detritus   	| 2                     	| 495.243264 	| 434.207408  	| 437.65760 	|
| Discord.js 	| 2                     	| 585.93280 	| 521.692624 	| 523.710464  	|
| Eris       	| 2                     	| 521.89184 	| 459.644048 	| 462.06976 	|
| Discordeno 	| 3                     	| 235.429388 	| 204.383444   	| 235.851776 	|
| Harmony    	| 3                     	| 450.440452 	| 414.107672 	| 451.555328 	|
| Detritus   	| 3                     	| 498.823168 	| 436.269728  	| 438.96832 	|
| Discord.js 	| 3                     	| 588.460032 	| 523.955992 	| 525.807616  	|
| Eris       	| 3                     	| 525.225984 	| 462.900248 	| 465.682432 	|
| Discordeno 	| 4                     	| 237.70590 	| 208.310496   	| 238.268416 	|
| Harmony    	| 4                     	| 485.688084 	| 441.260448 	| 486.567936 	|
| Detritus   	| 4                     	| 506.679296 	| 437.51016  	| 440.541184 	|
| Discord.js 	| 4                     	| 589.979648 	| 525.75072 	| 528.166912  	|
| Eris       	| 4                     	| 529.534976 	| 466.01748 	| 469.03296 	|
| Discordeno 	| 5                     	| 243.15398 	| 216.152212   	| 243.34336 	|
| Harmony    	| 5                     	| 438.983272 	| 424.298516 	| 440.037376 	|
| Detritus   	| 5                     	| 506.679296 	| 437.51016  	| 440.541184 	|
| Discord.js 	| 5                     	| 592.027648 	| 528.709968 	| 530.497536  	|
| Eris       	| 5                     	| 532.365312 	| 469.047128 	| 472.121344 	|


## Analysis

// TODO: Once the benchmarks are complete we can add an analysis to it.

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
