# dapi-bench

This is a simple benchmark comparing the current officially vetted libraries for JavaScript & TypeScript languages. Before, beginning setup you may need to install [**node**](https://nodejs.org/en/) or [**deno**](https://deno.land/#installation) or both.

It is impossible to have everyone test on the same system because each computer can be different. I recommend testing this in an environment that can be shared and used by anyone. The benchmarks below were conducted through [Github Codespaces](https://github.com/features/codespaces):

## Results

TODO: INSERT SCREENSHOTS OF BENCHMARKS HERE

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

3. Open 5(as many libraries you want to test) different terminal side by side so you can see them all.

4. In each one you can run the following commands for each library:

```shell
npm run discordeno
npm run harmony
npm run discordjs
npm run eris
npm run detritus
```

5. Wait and watch the logs
