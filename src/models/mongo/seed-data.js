export const seedData = {
  users: {
    _model: "User",
    homer: {
      firstName: "Homer",
      lastName: "Simpson",
      email: "homer@simpson.com",
      password: "secret",
      permissions: "ADMIN",
    },
    marge: {
      firstName: "Marge",
      lastName: "Simpson",
      email: "marge@simpson.com",
      password: "secret",
      permissions: "USER",
    },
    bart: {
      firstName: "Bart",
      lastName: "Simpson",
      email: "bart@simpson.com",
      password: "secret",
      permissions: "USER",
    }
  },

  locations:{
    _model: "Location",
    waterford: {
      placeName: "Waterford",
      userid: "->users.bart"
    }
  },

  coffeeShops:{
    _model : "CoffeeShops",
    coffeeShop_1 : {
      coffeeShopName: "Trade",
      lat:12.12,
      lng:32.365,
      description:"Test Desc",
      rating: 4.2,
      locationid:"->locations.waterford"
    }
  }
};