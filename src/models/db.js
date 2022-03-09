import { userMemStore } from "./mem/user-mem-store.js";
import { categoryMemStore } from "./mem/category-mem-store.js";
import { coffeeShopMemStore } from "./mem/coffeeShop-mem-store.js";

export const db = {
  userStore: null,
  categoryStore: null,
  coffeeShopStore: null,

  init() {
    this.userStore = userMemStore;
    this.categoryStore = categoryMemStore;
    this.coffeeShopStore = coffeeShopMemStore;
  },
};