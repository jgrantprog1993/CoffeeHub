import { CoffeeShop } from "./coffeeShop.js";

export const coffeeShopMongoStore = {
  async getAllCoffeeShops() {
    const coffeeShops = await CoffeeShop.find().lean();
    return coffeeShops;
  },

  async addCoffeeShop(categoryId, coffeeShop) {
    coffeeShop.categoryid = categoryId;
    const newCoffeeShop = new CoffeeShop(coffeeShop);
    const coffeeShopObj = await newCoffeeShop.save();
    return this.getCoffeeShopById(coffeeShopObj._id);
  },

  async getCoffeeShopsByCategoryId(id) {
    const coffeeShops = await CoffeeShop.find({ categoryid: id }).lean();
    return coffeeShops;
  },

  async getCoffeeShopById(id) {
    if (id) {
      const coffeeShop = await CoffeeShop.findOne({ _id: id }).lean();
      return coffeeShop;
    }
    return null;
  },

  async deleteCoffeeShop(id) {
    try {
      await CoffeeShop.deleteOne({ _id: id });
    } catch (error) {
      console.log("bad id");
    }
  },

  async deleteAllCoffeeShops() {
    await CoffeeShop.deleteMany({});
  },

  async updateCoffeeShop(coffeeShop, updatedCoffeeShop) {
    coffeeShop.title = updatedCoffeeShop.title;
    
    await coffeeShop.save();
  },
};