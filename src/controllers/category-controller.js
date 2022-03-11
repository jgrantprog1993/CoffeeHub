import { db } from "../models/db.js";

export const categoryController = {
  index: {
    handler: async function (request, h) {
      const category = await db.categoryStore.getCategoryById(request.params.id);
      const viewData = {
        title: "category",
        category: category,
      };
      return h.view("category-view", viewData);
    },
  }, 

  addCoffeeShop: {
    handler: async function (request, h) {
      const category = await db.categoryStore.getCategoryById(request.params.id);
      const newCoffeeShop = {
        title: request.payload.title,
      };
      await db.coffeeShopStore.addCoffeeShop(category._id, newCoffeeShop);
      return h.redirect(`/category/${category._id}`);
    },
  },
};