import { db } from "../models/db.js";
import { CoffeeShopSpec } from "../models/joi-schemas.js";

export const locationController = {
  index: {
    handler: async function (request, h) {
      const location = await db.locationStore.getLocationById(request.params.id);
      const viewData = {
        title: "Location",
        location: location,
      };
      return h.view("location-view", viewData);
    },
  }, 

  addCoffeeShop: {
    
    validate: {
      payload: CoffeeShopSpec,
      options: { abortEarly: false },
      failAction: function (request, h, error) {
        
        return h.view("location-view", { title: "Add CoffeeShop error", errors: error.details }).takeover().code(400);
      },
    },
    handler: async function (request, h) {
      const location = await db.locationStore.getLocationById(request.params.id);
      const newCoffeeShop = {
        coffeeShopName: request.payload.coffeeShopName,
        lat: Number(request.payload.lat),
        lng: Number(request.payload.lng),
        description: request.payload.description,
        rating: request.payload.rating
      };
      await db.coffeeShopStore.addCoffeeShop(location._id, newCoffeeShop);
      return h.redirect(`/location/${location._id}`);
    },
  },
  
  deleteCoffeeShop: {
   
    handler: async function(request, h) {
      const location = await db.locationStore.getLocationById(request.params.id);
      await db.coffeeShopStore.deleteCoffeeShop(request.params.coffeeShopid);
      return h.redirect(`/location/${location._id}`);
    },
  },
};