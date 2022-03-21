import { assert } from "chai";
import { placeMarkService } from "./placemark-service.js";
import { assertSubset } from "../test-utils.js";

import { maggie, fav1, testLocation, county } from "../fixtures.js";

const locations = new Array(testLocation.length)


suite("Location API tests", () => {

    
  
    setup(async () => {
      placeMarkService.clearAuth();
      //user = await placeMarkService.createUser(maggie);
      await placeMarkService.authenticate(maggie);
      await placeMarkService.deleteAllLocation();
      await placeMarkService.deleteAllUsers();

      for (let i=0; i< testLocation.lenght; i +=1) {
        locations[0] = await placeMarkService.createLocation(testLocation[i])
        
      }
      await placeMarkService.createLocation(fav1)
      //await placeMarkService.authenticate(maggie);
      fav1.userid = user._id;
    });

  teardown(async () => {});

  test("create location", async () => {
    const returnedLocation = await placeMarkService.createLocation(fav1);
    assert.isNotNull(returnedLocation);
    assertSubset(fav1, returnedLocation);
  });

  test("delete a location", async () => {
    const location = await placeMarkService.createLocation(fav1);
    const response = await placeMarkService.deleteLocation(location._id);
    assert.equal(response.status, 204);
    try {
      const returnedLocation = await placeMarkService.getLocation(location.id);
      assert.fail("Should not return a response");
    } catch (error) {
      assert(error.response.data.message === "No Location with this id", "Incorrect Response Message");
    }
  });

  test("create multiple locations", async () => {
    for (let i = 0; i < testLocation.length; i += 1) {
        testLocation[i].userid = user._id;
        // eslint-disable-next-line no-await-in-loop
        await placeMarkService.createLocation(testLocation[i]);
      }
      let returnedLists = await placeMarkService.getAllLocation();
      assert.equal(returnedLists.length, testLocation.length);
      await placeMarkService.deleteAllLocation();
      returnedLists = await placeMarkService.getAllLocation();
      assert.equal(returnedLists.length, 0);
  });

  test("remove non-existant location", async () => {
    try {
        const response = await placeMarkService.deleteLocation("not an id");
        assert.fail("Should not return a response");
      } catch (error) {
        assert(error.response.data.message === "No Location with this id", "Incorrect Response Message");
      }
  });
});