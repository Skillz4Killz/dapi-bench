# dapi-bench

[![Discord](https://img.shields.io/discord/785384884197392384?color=7289da&logo=discord&logoColor=dark)](https://discord.com/invite/5vBgXk3UcZ)

This is a simple benchmark comparing the current officially vetted libraries for JavaScript & TypeScript languages. Before, beginning setup you may need to install [**node**](https://nodejs.org/en/) or [**deno**](https://deno.land/#installation) or both.

It is impossible to have everyone test on the same system because each computer can be different. I recommend testing this in an environment that can be shared and used by anyone. The benchmarks below were conducted through [Github Codespaces](https://github.com/features/codespaces):

## Results

### Startup Times

To make it easier to view, I have split the terminals into two groups. Group 1 is NodeJS libraries and Group 2 is Deno libraries.

![image](https://user-images.githubusercontent.com/23035000/120896894-9440d880-c5f1-11eb-8550-89f608340af6.png)
> Note: The error in eris is normal handling. This is not a bad thing. Sometimes discord will request at random to reconnect by requesting a reset.

![image](https://user-images.githubusercontent.com/23035000/120896898-999e2300-c5f1-11eb-9c54-7a0b4e41b0e1.png)

### Memory Management 

TODO: Insert results, pending because i need to be free for 3-4hrs straight to run this to prevent codespaces from closing terminals due to inactivity.

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
