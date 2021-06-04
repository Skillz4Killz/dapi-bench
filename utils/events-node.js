exports.READY = function (started) {
  console.log(
    "Successfully connected to gateway",
    (Date.now() - started) / 1000,
    "seconds to start."
  );
};

exports.SHARD_READY = function (id, time) {
  const here = Date.now();
  console.log(`SHARD READY`, id, (here - time) / 1000, "seconds to start.");
  return here;
};

const nodebytes = 1000000;

exports.logMemory = function (
  usage,
  counter,
  lib,
  guilds,
  members,
  messages,
  channels
) {
  console.log({
    minutes: counter,
    rss: usage.rss / nodebytes,
    heapUsed: usage.heapUsed / nodebytes,
    heapTotal: usage.heapTotal / nodebytes,
    lib,
    guilds,
    members,
    messages,
    channels,
  });
  return counter++;
};
