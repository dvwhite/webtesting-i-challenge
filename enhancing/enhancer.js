module.exports = {
  succeed,
  fail,
  repair,
  get,
};

function succeed(item) {
  // Accepts an item object and returns a new item object
  const maxEnhancement = 20;
  item.enhancement += (item.enhancement < maxEnhancement ? 1 : 0);
  return { ...item };
}

function fail(item) {
  // Accepts an item object and returns a new item object
  let durabilityDecrease;
  if (item.enhancement < 15) {
    durabilitytDecrease = 5;
  } else {
    durabilityDecrease = 10;
  }
  item.durability -= durabilityDecrease;
  item.enhancement -= (item.enhancement > 16 ? 1 : 0);
  return { ...item };
}

function repair(item) {
  // Accepts an item object and returns a new item with the durability restored to 100
  return { ...item, durability: 100 };
}

function get(item) {
  return { ...item };
}
