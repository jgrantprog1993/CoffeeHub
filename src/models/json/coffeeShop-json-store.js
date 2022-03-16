import { v4 } from "uuid";
// eslint-disable-next-line import/no-unresolved
import { JSONFile, Low } from "lowdb";

const db = new Low(new JSONFile("./src/models/json/coffeeShops.json"));
db.data = { coffeeShops: [] };

export const coffeeShopJsonStore = {
  async getAllcoffeeShops() {
    await db.read();
    return db.data.coffeeShops;
  },

  async addcoffeeShop(categoryId, coffeeShop) {
    await db.read();
    coffeeShop._id = v4();
    coffeeShop.categoryid = categoryId;
    db.data.coffeeShops.push(coffeeShop);
    await db.write();
    return coffeeShop;
  },

  async getcoffeeShopsByCategoryId(id) {
    await db.read();
    return db.data.coffeeShops.filter((coffeeShop) => coffeeShop.categoryid === id);
  },

  async getcoffeeShopById(id) {
    await db.read();
    return db.data.coffeeShops.find((coffeeShop) => coffeeShop._id === id);
  },

  async deletecoffeeShop(id) {
    await db.read();
    const index = db.data.coffeeShops.findIndex((coffeeShop) => coffeeShop._id === id);
    db.data.coffeeShops.splice(index, 1);
    await db.write();
  },

  async deleteAllcoffeeShops() {
    db.data.coffeeShops = [];
    await db.write();
  },

  async updatecoffeeShop(coffeeShop, updatedcoffeeShop) {
    coffeeShop.title = updatedcoffeeShop.title;
    
    await db.write();
  },
};