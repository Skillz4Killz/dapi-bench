export function READY(started: number) {
  console.log(
    "Successfully connected to gateway",
    (Date.now() - started) / 1000,
    "seconds to start."
  );
}

export function SHARD_READY(id: number, time: number) {
  const here = Date.now();
  console.log(`SHARD READY`, id, (here - time) / 1000, "seconds to start.");
  return here;
}

const bytes = 1000000;

export function logMemory(
  usage: any,
  counter: number,
  lib: "discordeno" | "harmony" | "university",
  guilds: number,
  members: number,
  messages: number,
  channels: number
) {
  console.log({
    minutes: counter,
    rss: usage.rss / bytes,
    heapUsed: usage.heapUsed / bytes,
    heapTotal: usage.heapTotal / bytes,
    lib,
    guilds,
    members,
    messages,
    channels,
  });
  return counter++;
}
