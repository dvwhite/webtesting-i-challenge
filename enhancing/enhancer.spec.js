const enhancer = require("./enhancer.js");
// test away!

const range = end => {
  const arr = Array.from({length: end}, (_, idx) => idx + 1);
  arr.unshift(0);
  return arr;
};

const verifyProperties = obj => {
  const keys = Object.keys(obj);
  const hasName = keys.includes("name");
  const hasDurability = keys.includes("durability");
  const hasEnhancement = keys.includes("enhancement");
  return (hasName && hasDurability && hasEnhancement);
};

const verifyRanges = obj => {
  const durabilityRange = range(100); // 0 to 100, inclusive
  const enhanceRange = range(20); // 0 to 20, inclusive
  const durabilityInRange = durabilityRange.includes(obj.durability);
  const enhancementInRange = enhanceRange.includes(obj.enhancement);
  return (durabilityInRange && enhancementInRange);
};

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

  // get
  it("returns an object with the same properties when get(item) is called", () => {
    const newItem = enhancer.get(item1);
    expect(newItem).toEqual(item1); // Test equivalency
    expect(verifyProperties(newItem)).toBe(true); // Test it still has properties expected
    delete newItem.durability;
    expect(newItem).not.toEqual(item1);
  });

  // repair
  it("returns an object with durability=100 when repair(item) is called", () => {
    // Normal case, expected usage, correct shape, needs repairs, no bugs in quantities
    const repairedItem = enhancer.repair(item1);
    expect(repairedItem.durability).toBe(100);
    
    // Unlikely cases - but nevertheless good to test for them
    
    //  Ensure it handles negative durability quantities
    const buggyItem = { name: "Durability can't be negative", durability: -100, enhancement: 20 };
    const repairedBuggyItem = enhancer.repair(buggyItem);
    expect(repairedBuggyItem.durability).toBe(100);

    // Ensure it handles not needing to be repaired
    const perfectItem = { name: "Doesn't need repairs", durability: 100, enhancement: 20 };
    const repairedFineItem = enhancer.repair(perfectItem);
    expect(repairedFineItem.durability).toBe(100);

    // Ensure it handles lack of a durability property
    const wrongShape = { name: "Lacks the durability property", durrabillity: 100, enhancement: 1 }
    const repairedTypoItem = enhancer.repair(wrongShape);
    expect(repairedTypoItem.durability).toBe(100);

    // Ensure it still has the desired properties on the normal case and typo'd case
    expect(verifyProperties(repairedItem)).toBe(true);
    expect(verifyProperties(repairedTypoItem)).toBe(true); 
  });

  // succeed
  it("", () => {

  });

  // fail
  it("", () => {

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
