import { assert } from "chai";
import { placeMarkService } from "./placemark-service.js";
import { assertSubset } from "../test-utils.js";

import { maggie, fav1, testCategories, county } from "../fixtures.js";

const categories = new Array(testCategories.length)


suite("Category API tests", () => {

    
  
    setup(async () => {
      placeMarkService.clearAuth();
      //user = await placeMarkService.createUser(maggie);
      await placeMarkService.authenticate(maggie);
      await placeMarkService.deleteAllCategories();
      await placeMarkService.deleteAllUsers();

      for (let i=0; i< testCategories.lenght; i +=1) {
        categories[0] = await placeMarkService.createCategory(testCategories[i])
        
      }
      await placeMarkService.createCategory(fav1)
      //await placeMarkService.authenticate(maggie);
      fav1.userid = user._id;
    });

  teardown(async () => {});

  test("create category", async () => {
    const returnedCategory = await placeMarkService.createCategory(fav1);
    assert.isNotNull(returnedCategory);
    assertSubset(fav1, returnedCategory);
  });

  test("delete a category", async () => {
    const category = await placeMarkService.createCategory(fav1);
    const response = await placeMarkService.deleteCategory(category._id);
    assert.equal(response.status, 204);
    try {
      const returnedCategory = await placeMarkService.getCategory(category.id);
      assert.fail("Should not return a response");
    } catch (error) {
      assert(error.response.data.message === "No Category with this id", "Incorrect Response Message");
    }
  });

  test("create multiple categories", async () => {
    for (let i = 0; i < testCategories.length; i += 1) {
        testCategories[i].userid = user._id;
        // eslint-disable-next-line no-await-in-loop
        await placeMarkService.createCategory(testCategories[i]);
      }
      let returnedLists = await placeMarkService.getAllCategories();
      assert.equal(returnedLists.length, testCategories.length);
      await placeMarkService.deleteAllCategories();
      returnedLists = await placeMarkService.getAllCategories();
      assert.equal(returnedLists.length, 0);
  });

  test("remove non-existant category", async () => {
    try {
        const response = await placeMarkService.deleteCategory("not an id");
        assert.fail("Should not return a response");
      } catch (error) {
        assert(error.response.data.message === "No Category with this id", "Incorrect Response Message");
      }
  });
});