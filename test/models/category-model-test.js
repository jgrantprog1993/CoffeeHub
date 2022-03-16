import { assert } from "chai";
import { db } from "../../src/models/db.js"
import { testCategories, county } from "../fixtures.js";
import { assertSubset } from "../test-utils.js";

suite("Category Model tests", () => {

  setup(async () => {
    db.init("mongo");
    await db.categoryStore.deleteAllCategories();
    for (let i = 0; i < testCategories.length; i += 1) {
      // eslint-disable-next-line no-await-in-loop
      testCategories[i] = await db.categoryStore.addCategory(testCategories[i]);
    }
  });

  test("create a Category", async () => {
    const category = await db.categoryStore.addCategory(county);
    assertSubset(county, category);
    assert.isDefined(category._id);
  });

  test("delete all Categories", async () => {
    let returnedCategories = await db.categoryStore.getAllCategories();
    assertSubset(returnedCategories.length, 4);
    await db.categoryStore.deleteAllCategories();
    returnedCategories = await db.categoryStore.getAllCategories();
    assertSubset(returnedCategories.length, 0);
  });

  test("get a Category - success", async () => {
    const category = await db.categoryStore.addCategory(county);
    const returnedCategory = await db.categoryStore.getCategoryById(category._id);
    assertSubset(county, category);
  });

  test("delete One Playist - success", async () => {
    const id = testCategories[0]._id;
    await db.categoryStore.deleteCategoryById(id);
    const returnedCategories = await db.categoryStore.getAllCategories();
    assertSubset(returnedCategories.length, testCategories.length - 1);
    const deletedCategory = await db.categoryStore.getCategoryById(id);
    assert.isNull(deletedCategory);
  });

  test("get a Category - bad params", async () => {
    assert.isNull(await db.categoryStore.getCategoryById(""));
    assert.isNull(await db.categoryStore.getCategoryById());
  });

  test("delete One Category - fail", async () => {
    await db.categoryStore.deleteCategoryById("bad-id");
    const allCategories = await db.categoryStore.getAllCategories();
    assertSubset(testCategories.length, allCategories.length);
  });
});