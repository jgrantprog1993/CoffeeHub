import { userMemStore } from "./mem/user-mem-store.js";
import { categoryMemStore } from "./mem/category-mem-store.js";
import { coffeeShopMemStore } from "./mem/coffeeShop-mem-store.js";

import { userJsonStore } from "./json/user-json-store.js";
import { categoryJsonStore } from "./json/category-json-store.js";
import { coffeeShopJsonStore } from "./json/coffeeShop-json-store.js";

import { connectMongo } from "./mongo/connect.js";
import { userMongoStore } from "./mongo/user-mongo-store.js";
import { categoryMongoStore } from "./mongo/category-mongo-store.js";
import { coffeeShopMongoStore } from "./mongo/coffeeShop-mongo-store.js";

export const db = {
  userStore: null,
  categoryStore: null,
  coffeeShopStore: null,

  init(storeType) {
    switch (storeType) {
      case "mongo":
        this.userStore = userMongoStore;
        this.categoryStore = categoryMongoStore;
        this.coffeeShopStore = coffeeShopMongoStore;
        connectMongo();
        break;
      case "json":
        this.userStore = userJsonStore;
        this.categoryStore = categoryJsonStore;
        this.coffeeShopStore = coffeeShopJsonStore;
      break;
    default:
        this.userStore = userMemStore;
        this.categoryStore = categoryMemStore;
        this.coffeeShopStore = coffeeShopMemStore;
    }
  }
}; 

