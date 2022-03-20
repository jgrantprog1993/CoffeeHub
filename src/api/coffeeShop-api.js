import Boom from "@hapi/boom";
import { db } from "../models/db.js";
import { IdSpec, CoffeeShopSpec, CoffeeShopSpecPlus, CoffeeShopArraySpec } from "../models/joi-schemas.js";
import { validationError } from "./logger.js";

export const coffeeShopApi = {
  find: {
    auth: {
      strategy: "jwt",
    },
    handler: async function (request, h) {
      try {
        const coffeeShops = await db.coffeeShopStore.getAllCoffeeShops();
        return coffeeShops;
      } catch (err) {
        return Boom.serverUnavailable("Database Error");
      }
    },
    tags: ["api"],
    response: { schema: CoffeeShopArraySpec, failAction: validationError },
    description: "Get all coffeeShopApi",
    notes: "Returns all coffeeShopApi",
  },

  findOne: {
    auth: {
      strategy: "jwt",
    },
    async handler(request) {
      try {
        const coffeeShop = await db.coffeeShopStore.getCoffeeShopById(request.params.id);
        if (!coffeeShop) {
          return Boom.notFound("No coffeeShop with this id");
        }
        return coffeeShop;
      } catch (err) {
        return Boom.serverUnavailable("No coffeeShop with this id");
      }
    },
    tags: ["api"],
    description: "Find a CoffeeShop",
    notes: "Returns a coffeeShop",
    validate: { params: { id: IdSpec }, failAction: validationError },
    response: { schema: CoffeeShopSpecPlus, failAction: validationError },
  },

  create: {
    auth: {
      strategy: "jwt",
    },
    handler: async function (request, h) {
      try {
        const coffeeShop = await db.coffeeShopStore.addCoffeeShop(request.params.id, request.payload);
        if (coffeeShop) {
          return h.response(coffeeShop).code(201);
        }
        return Boom.badImplementation("error creating coffeeShop");
      } catch (err) {
        return Boom.serverUnavailable("Database Error");
      }
    },
    tags: ["api"],
    description: "Create a CoffeeShop",
    notes: "Returns the newly created CoffeeShop",
    validate: { payload: CoffeeShopSpec },
    response: { schema: CoffeeShopSpecPlus, failAction: validationError },
  },

  deleteAll: {
    auth: {
      strategy: "jwt",
    },
    handler: async function (request, h) {
      try {
        await db.coffeeShopStore.deleteAllCoffeeShops();
        return h.response().code(204);
      } catch (err) {
        return Boom.serverUnavailable("Database Error");
      }
    },
    tags: ["api"],
    description: "Delete all CoffeeShopApi",
  },

  deleteOne: {
    auth: {
      strategy: "jwt",
    },
    handler: async function (request, h) {
      try {
        const coffeeShop = await db.coffeeShopStore.getCoffeeShopById(request.params.id);
        if (!coffeeShop) {
          return Boom.notFound("No CoffeeShop with this id");
        }
        await db.coffeeShopStore.deleteCoffeeShop(coffeeShop._id);
        return h.response().code(204);
      } catch (err) {
        return Boom.serverUnavailable("No CoffeeShop with this id");
      }
    },
    tags: ["api"],
    description: "Delete a CoffeeShop",
    validate: { params: { id: IdSpec }, failAction: validationError },
  },
};