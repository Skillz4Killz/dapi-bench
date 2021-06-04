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
