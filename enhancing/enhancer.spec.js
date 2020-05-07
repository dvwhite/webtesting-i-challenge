const enhancer = require("./enhancer.js");
// test away!

const range = (end) => {
  // Returns an array of integers from 0 to end, inclusive
  const arr = Array.from({ length: end }, (_, idx) => idx + 1);
  arr.unshift(0);
  return arr;
};

const verifyRanges = (obj) => {
  // Verifies that the object has properties in the desired range of values
  const durabilityRange = range(100); // 0 to 100, inclusive
  const enhanceRange = range(20); // 0 to 20, inclusive
  const durabilityInRange = durabilityRange.includes(obj.durability);
  const enhancementInRange = enhanceRange.includes(obj.enhancement);
  console.log("obj:", obj)
  return durabilityInRange && enhancementInRange;
};

const verifyProperties = (obj) => {
  // Verifies that the object has all the required properties
  const keys = Object.keys(obj);
  const hasName = keys.includes("name");
  const hasDurability = keys.includes("durability");
  const hasEnhancement = keys.includes("enhancement");
  return hasName && hasDurability && hasEnhancement;
};

describe("the item method library under test", () => {
  // Declare initial test vars
  let items, item1, item2, item3, item4, item5;

  // (Re)build them before each test
  beforeEach(() => {
    item1 = { name: "Test Item 1", durability: 0, enhancement: 0 };
    item2 = { name: "Test Item 2", durability: 99, enhancement: 14 };
    item3 = { name: "Test Item 3", durability: 99, enhancement: 15 };
    item4 = { name: "Test Item 4", durability: 99, enhancement: 17 };
    item5 = { name: "Test Item 5", durability: 100, enhancement: 20 };
    items = [item1, item2, item3, item4, item5];
  });

  // get
  it("returns an object with the same properties when get(item) is called", () => {
    const newItem = enhancer.get(item1);
    expect(newItem).toEqual(item1); // Test equivalency
    expect(verifyProperties(newItem)).toBe(true); // Test it still has properties expected
    expect(verifyRanges(newItem)).toBe(true);
    delete newItem.durability;
    expect(newItem).not.toEqual(item1);
  });

  // repair
  it("returns an object with durability=100 when repair(item) is called", () => {
    // Normal case, expected usage, correct shape, needs repairs, no bugs in quantities
    const repairedItem = enhancer.repair(item1);
    expect(repairedItem.durability).toBe(100);
    expect(repairedItem.durability).not.toBe(-1);
    expect(verifyRanges(repairedItem)).toBe(true);

    // Unlikely cases - but nevertheless good to test for them

    //  Ensure it handles negative durability quantities
    const buggyItem = {
      name: "Durability can't be negative",
      durability: -100,
      enhancement: 20,
    };
    const repairedBuggyItem = enhancer.repair(buggyItem);
    expect(repairedBuggyItem.durability).toBe(100);
    expect(verifyRanges(repairedBuggyItem)).toBe(true);

    // Ensure it handles not needing to be repaired
    const perfectItem = {
      name: "Doesn't need repairs",
      durability: 100,
      enhancement: 20,
    };
    const repairedFineItem = enhancer.repair(perfectItem);
    expect(repairedFineItem.durability).toBe(100);
    expect(verifyRanges(repairedFineItem)).toBe(true);

    // Ensure it handles lack of a durability property
    const wrongShape = {
      name: "Lacks the durability property",
      durrabillity: 100,
      enhancement: 1,
    };
    const repairedTypoItem = enhancer.repair(wrongShape);
    expect(repairedTypoItem.durability).toBe(100);
    expect(verifyRanges(repairedTypoItem)).toBe(true);

    // Ensure it still has the desired properties on the normal case and typo'd case
    expect(verifyProperties(repairedItem)).toBe(true);
    expect(verifyProperties(repairedTypoItem)).toBe(true);
  });

  // succeed
  it("increments the item enhancement if < 20 when calling succeed(item)", () => {
    // Calls the script using test objects
    const enhance1 = enhancer.succeed(item1);
    expect(enhance1.enhancement).toBe(1);
    const enhance2 = enhancer.succeed(item2);
    expect(enhance2.enhancement).toBe(15);
    const enhance3 = enhancer.succeed(item3);
    expect(enhance3.enhancement).toBe(16);
    const enhance4 = enhancer.succeed(item4);
    expect(enhance4.enhancement).toBe(18);
    const enhance5 = enhancer.succeed(item5);
    expect(enhance5.enhancement).toBe(20);
  });

  it("stays in the desired range when calling succeed", () => {
    // The item's enhancement should be a number from 0 to 20.
    const enhance1 = enhancer.succeed(item1);
    const enhance2 = enhancer.succeed(item2);
    const enhance3 = enhancer.succeed(item3);
    const enhance4 = enhancer.succeed(item4);
    const enhance5 = enhancer.succeed(item5);
    const enhance6 = enhancer.succeed({
      name: "Enhancement value is too small",
      durability: 1,
      enhancement: -10,
    });
    const enhance7 = enhancer.succeed({
      name: "Enhancement value is too large",
      durability: 1,
      enhancement: 21,
    });
    expect(verifyRanges(enhance1)).toBe(true);
    expect(verifyRanges(enhance2)).toBe(true);
    expect(verifyRanges(enhance3)).toBe(true);
    expect(verifyRanges(enhance4)).toBe(true);
    expect(verifyRanges(enhance5)).toBe(true);
    expect(verifyRanges(enhance6)).toBe(true);
    expect(verifyRanges(enhance7)).toBe(true);
  });

  // The durability of the item is not changed.
  it("doesn't change the durability value", () => {
    const enhance1 = enhancer.succeed(item1);
    const enhance2 = enhancer.succeed(item2);
    const enhance3 = enhancer.succeed(item3);
    const enhance4 = enhancer.succeed(item4);
    const enhance5 = enhancer.succeed(item5);
    expect(enhance1.durability).toBe(0);
    expect(enhance2.durability).toBe(99);
    expect(enhance3.durability).toBe(99);
    expect(enhance4.durability).toBe(99);
    expect(enhance5.durability).toBe(100);
  });

  // fail
  it("stays in the desired range when calling fail", () => {
    // The item's enhancement should be a number from 0 to 20.
    const enhance1 = enhancer.fail(item1);
    const enhance2 = enhancer.fail(item2);
    const enhance3 = enhancer.fail(item3);
    const enhance4 = enhancer.fail(item4);
    const enhance5 = enhancer.fail(item5);
    const enhance6 = enhancer.fail({
      name: "Enhancement value is too small",
      durability: 1,
      enhancement: -10,
    });
    const enhance7 = enhancer.fail({
      name: "Enhancement value is too large",
      durability: 1,
      enhancement: 21,
    });
    expect(verifyRanges(enhance1)).toBe(true);
    expect(verifyRanges(enhance2)).toBe(true);
    expect(verifyRanges(enhance3)).toBe(true);
    expect(verifyRanges(enhance4)).toBe(true);
    expect(verifyRanges(enhance5)).toBe(true);
    expect(verifyRanges(enhance6)).toBe(true);
    expect(verifyRanges(enhance7)).toBe(true);
  });

  it("decreases the durability by 5 if the item's enhancement is less than 15", () => {

  });

  it("decreases the durability by 10 if the item's enhancement is 15 or more", () => {
    
  });

  it("decreases the enhancement by 1 if the item's enhancement is greater than 16", () => {
    
  });
});