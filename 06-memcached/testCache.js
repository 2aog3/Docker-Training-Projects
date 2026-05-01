import Memcached from "memcached";
const memcached = new Memcached("localhost:11211");

memcached.set("developer", "Ahmad_Abuzaid", 10, (err) => {
  if (err) console.error(err);
  console.log("✅ Data saved to Memcached successfully!");

  memcached.get("developer", (err, data) => {
    if (err) console.error(err);
    console.log("📥 Retrieved from cache:", data);
    process.exit();
  });
});
