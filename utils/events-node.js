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
  return time;
};
