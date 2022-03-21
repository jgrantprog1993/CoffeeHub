import { userJsonStore } from "./json/user-json-store.js";
import { locationJsonStore } from "./json/location-json-store.js";
import { coffeeShopJsonStore } from "./json/coffeeShop-json-store.js";

import { connectMongo } from "./mongo/connect.js";
import { userMongoStore } from "./mongo/user-mongo-store.js";
import { locationMongoStore } from "./mongo/location-mongo-store.js";
import { coffeeShopMongoStore } from "./mongo/coffeeShop-mongo-store.js";

export const db = {
  userStore: null,
  locationStore: null,
  coffeeShopStore: null,

  init(storeType) {
    switch (storeType) {
      case "mongo":
        this.userStore = userMongoStore;
        this.locationStore = locationMongoStore;
        this.coffeeShopStore = coffeeShopMongoStore;
        connectMongo();
        break;
      case "json":
        this.userStore = userJsonStore;
        this.locationStore = locationJsonStore;
        this.coffeeShopStore = coffeeShopJsonStore;
      break;
    }
  }
}; 

