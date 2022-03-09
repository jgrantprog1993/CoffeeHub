import { db } from "../models/db.js";

export const dashboardController = {
  index: {
    handler: async function (request, h) {
      const categories = await db.categoryStore.getAllCategories();
      const viewData = {
        title: "PlaceMark Dashboard",
        categories: categories,
      };
      return h.view("dashboard-view", viewData);
    },
  },

  addCategory: {
    handler: async function (request, h) {
      const newcategory = {
        title: request.payload.title,
      };
      await db.categoryStore.addCategory(newcategory);
      return h.redirect("/dashboard");
    },
  },
};