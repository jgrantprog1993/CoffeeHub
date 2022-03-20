import { v4 } from "uuid";

let coffeeShops = [];

export const coffeeShopMemStore = {
  async getAllCoffeeShop() {
    return coffeeShops;
  },

  async addCoffeeShop(categoryId, coffeeShop) {
    coffeeShop._id = v4();
    coffeeShop.categoryid = categoryId;
    coffeeShops.push(coffeeShop);
    return coffeeShop;
    
  }, 

  async getCoffeeShopsByCategoryId(id) {
    return coffeeShops.filter((coffeeShop) => coffeeShop.categoryid === id);
  },

  async getCoffeeShopById(id) {
    return coffeeShops.find((coffeeShop) => coffeeShop._id === id);
  },

  async getCategoryCoffeeShops(categoryId) {
    return coffeeShops.filter((coffeeShop) => coffeeShop.categoryid === categoryId);
  },

  async deleteCoffeeShop(id) {
    const index = coffeeShops.findIndex((coffeeShop) => coffeeShop._id === id);
    coffeeShops.splice(index, 1);
  },

  async deleteAllCoffeeShops() {
    coffeeShops = [];
  },

  async updateCoffeeShop(coffeeShop, updatedCoffeeShop) {
    coffeeShop.coffeeShopName = updatedCoffeeShop.coffeeShopName;
  },
};