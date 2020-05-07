module.exports = {
  succeed,
  fail,
  repair,
  get,
};

function succeed(item) {
  // Accepts an item object and returns a new item object
  const minEnhancement = 0;
  const maxEnhancement = 20;
  item.enhancement += item.enhancement < maxEnhancement ? 1 : 0;
  item.enhancement = Math.max(
    Math.min(item.enhancement, maxEnhancement),
    minEnhancement
  );
  return { ...item };
}

function fail(item) {
  // Accepts an item object and returns a new item object
  // Define valid ranges for the object
  const minEnhancement = 0;
  const maxEnhancement = 20;
  const minDurability = 0;
  const maxDurability = 100;

  // Determine the durability decrease factor
  let durabilityDecrease;
  if (item.enhancement < 15) {
    durabilityDecrease = 5;
  } else {
    durabilityDecrease = 10;
  }

  // Modify the durability and enhancement
  item.durability -= durabilityDecrease;
  item.durability = Math.min(
    Math.max(item.durability, minDurability),
    maxDurability
  );

  item.enhancement -= (item.enhancement > 16 ? 1 : 0);
  item.enhancement = Math.min(
    Math.max(item.enhancement, minEnhancement),
    maxEnhancement
  );

  return { ...item };
}

function repair(item) {
  // Accepts an item object and returns a new item with the durability restored to 100
  return { ...item, durability: 100 };
}

function get(item) {
  if (item.enhancement > 0) {
    item.name = `[+${item.enhancement}] ${item.name}`;
  }
  return { ...item };
}
