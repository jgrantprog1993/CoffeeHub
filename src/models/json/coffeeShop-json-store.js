import { v4 } from "uuid";
// eslint-disable-next-line import/no-unresolved
import { JSONFile, Low } from "lowdb";

const db = new Low(new JSONFile("./src/models/json/coffeeShops.json"));
db.data = { coffeeShops: [] };

export const coffeeShopJsonStore = {
  async getAllCoffeeShops() {
    await db.read();
    return db.data.coffeeShops;
  },

  async addCoffeeShop(categoryId, coffeeShop) {
    await db.read();
    coffeeShop._id = v4();
    coffeeShop.categoryid = categoryId;
    db.data.coffeeShops.push(coffeeShop);
    await db.write();
    return coffeeShop;
  },

  async getCoffeeShopsByCategoryId(id) {
    await db.read();
    return db.data.coffeeShops.filter((coffeeShop) => coffeeShop.categoryid === id);
  },

  async getCoffeeShopById(id) {
    await db.read();
    return db.data.coffeeShops.find((coffeeShop) => coffeeShop._id === id);
  },

  async deleteCoffeeShop(id) {
    await db.read();
    const index = db.data.coffeeShops.findIndex((coffeeShop) => coffeeShop._id === id);
    db.data.coffeeShops.splice(index, 1);
    await db.write();
  },

  async deleteAllCoffeeShops() {
    db.data.coffeeShops = [];
    await db.write();
  },

  async updateCoffeeShop(coffeeShop, updatedcoffeeShop) {
    coffeeShop.coffeeShopName = updatedcoffeeShop.coffeeShopName;
    coffeeShop.lat = updatedcoffeeShop.lat;
    coffeeShop.lng = updatedcoffeeShop.lng;
    coffeeShop.description = updatedcoffeeShop.description;
    
    await db.write();
  },
};