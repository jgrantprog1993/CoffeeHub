// import { userMemStore } from "./mem/user-mem-store.js";
// import { categoryMemStore } from "./mem/category-mem-store.js";
// import { coffeeShopMemStore } from "./mem/coffeeShop-mem-store.js";

import { userJsonStore } from "./json/user-json-store.js";
import { categoryJsonStore } from "./json/category-json-store.js";
import { coffeeShopJsonStore } from "./json/coffeeShop-json-store.js";

export const db = {
  userStore: null,
  categoryStore: null,
  coffeeShopStore: null,

  init() {
    // this.userStore = userMemStore;
    // this.categoryStore = categoryMemStore;
    // this.coffeeShopStore = coffeeShopMemStore;

    this.userStore = userJsonStore;
    this.categoryStore = categoryJsonStore;
    this.coffeeShopStore = coffeeShopJsonStore;
  },
}; 

