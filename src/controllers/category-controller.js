import { db } from "../models/db.js";

export const categoryController = {
  index: {
    handler: async function (request, h) {
      const category = await db.categoryStore.getCategoryById(request.params.id);
      const viewData = {
        title: "Category",
        category: category,
      };
      return h.view("category-view", viewData);
    },
  }, 

  addCoffeeShop: {
    validate: {
      payload: CoffeeShopSpec,
      options: { abortEarly: false },
      failAction: function (request, h, error) {
        return h.view("category-view", { title: "Add coffeeShop error", errors: error.details }).takeover().code(400);
      },
    },
    handler: async function (request, h) {
      const category = await db.categoryStore.getCategoryById(request.params.id);
      const newCoffeeShop = {
        title: request.payload.title,
      };
      await db.coffeeShopStore.addCoffeeShop(category._id, newCoffeeShop);
      return h.redirect(`/category/${category._id}`);
    },
  },
  
  deleteCoffeeShop: {
    handler: async function(request, h) {
      const category = await db.categoryStore.getCategoryById(request.params.id);
      await db.coffeeShopStore.deleteCoffeeShop(request.params.coffeeShopid);
      return h.redirect(`/category/${category._id}`);
    },
  },
};