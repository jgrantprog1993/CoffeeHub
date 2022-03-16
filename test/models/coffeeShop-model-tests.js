import { assert } from "chai";
import { db } from "../../src/models/db.js";
import { testCategories, testCoffeeShops, county, fav1, fav2, testUsers } from "../fixtures.js";
import { assertSubset } from "../test-utils.js";

suite("CoffeeShop Model tests", () => {

  let countyList = null;

  setup(async () => {
    db.init("mongo");
    await db.categoryStore.deleteAllCategories();
    await db.coffeeShopStore.deleteAllCoffeeShops();
    countyList = await db.categoryStore.addCategory(county);
    for (let i = 0; i < testCoffeeShops.length; i += 1) {
      // eslint-disable-next-line no-await-in-loop
      testCoffeeShops[i] = await db.coffeeShopStore.addCoffeeShop(countyList._id, testCoffeeShops[i]);
    }
  });

  test("create single coffeeShop", async () => {
    const fav1List = await db.categoryStore.addCategory(fav1);
    const coffeeShop = await db.coffeeShopStore.addCoffeeShop(fav1List._id, fav2)
    assert.isNotNull(coffeeShop._id);
    assertSubset (fav2, coffeeShop);
  });

  test("get multiple coffeeShops", async () => {
    const coffeeShops = await db.coffeeShopStore.getCoffeeShopsByCategoryId(countyList._id);
    assert.equal(testCoffeeShops.length, testCoffeeShops.length)
  });

  test("delete all coffeeShops", async () => {
    const coffeeShops = await db.coffeeShopStore.getAllCoffeeShops();
    assert.equal(testCoffeeShops.length, coffeeShops.length);
    await db.coffeeShopStore.deleteAllCoffeeShops();
    const newCoffeeShops = await db.coffeeShopStore.getAllCoffeeShops();
    assert.equal(0, newCoffeeShops.length);
  });

  test("get a coffeeShop - success", async () => {
    const fav1List = await db.categoryStore.addCategory(fav1);
    const coffeeShop = await db.coffeeShopStore.addCoffeeShop(fav1List._id, fav2)
    const newCoffeeShop = await db.coffeeShopStore.getCoffeeShopById(coffeeShop._id);
    assertSubset (fav2, newCoffeeShop);
  });

  test("delete One CoffeeShop - success", async () => {
    await db.coffeeShopStore.deleteCoffeeShop(testCoffeeShops[0]._id);
    const coffeeShops = await db.coffeeShopStore.getAllCoffeeShops();
    assert.equal(coffeeShops.length, testCategories.length - 1);
    const deletedCoffeeShop = await db.coffeeShopStore.getCoffeeShopById(testCoffeeShops[0]._id);
    assert.isNull(deletedCoffeeShop);
  });

  test("get a coffeeShop - bad params", async () => {
    assert.isNull(await db.coffeeShopStore.getCoffeeShopById(""));
    assert.isNull(await db.coffeeShopStore.getCoffeeShopById());
  });

  test("delete one coffeeShop - fail", async () => {
    await db.coffeeShopStore.deleteCoffeeShop("bad-id");
    const coffeeShops = await db.coffeeShopStore.getAllCoffeeShops();
    assert.equal(coffeeShops.length, testCategories.length);
  });
});