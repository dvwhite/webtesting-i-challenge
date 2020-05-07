const enhancer = require("./enhancer.js");
// test away!

const verifyProperties = obj => {
  const keys = Object.keys(obj);
  const hasName = keys.includes("name");
  const hasDurability = keys.includes("durability");
  const hasEnhancement = keys.includes("enhancement");
  return (hasName && hasDurability && hasEnhancement);
}

describe("item methods testing", () => {
  // Declare initial test vars
  let items, item1, item2, item3, item4, item5;

  // (Re)build them before each test
  beforeEach(() => {
    item1 = { name: "Test Item 1", durability: 0, enhancement: 0 };
    item2 = { name: "Test Item 2", durability: 99, enhancement: 14 };
    item3 = { name: "Test Item 3", durability: 99, enhancement: 15 };
    item2 = { name: "Test Item 4", durability: 99, enhancement: 17 };
    item5 = { name: "Test Item 5", durability: 100, enhancement: 20 };
    items = [item1, item2, item3, item4, item5];
  });

  it("returns an object with the same properties when get(item) is called", () => {
    const newItem = enhancer.get(item1);
    expect(newItem).toEqual(item1); // Test equivalency
    expect(verifyProperties(newItem)).toBe(true); // Test it still has properties expected
  });
});

// The item's enhancement it's a number from 0 to 20.

// The item's durability it's a number from 0 to 100.

// When enhancement succeeds

// The item's enhancement increases by 1.

// If the item enhancement level is 20, the enhancement level is not changed.

// The durability of the item is not changed.

// When enhancement fails

// If the item's enhancement is less than 15, the durability of the item is decreased by 5.

// If the item's enhancement is 15 or more, the durability of the item is decreased by 10.

// If the item's enhancement level is greater than 16, the enhancement level decreases by 1 (17 goes down to 16, 18 goes down to 17).
