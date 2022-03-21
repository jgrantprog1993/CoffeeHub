import Joi from "joi";

export const IdSpec = Joi.alternatives().try(Joi.string(), Joi.object()).description("a valid ID");

export const UserCredentialsSpec = Joi.object()
  .keys({
    email: Joi.string().email().example("homer@simpson.com").required(),
    password: Joi.string().example("secret").required(),
  })
  .label("UserCredentials");

export const UserSpec = UserCredentialsSpec.keys({
  firstName: Joi.string().example("Homer").required(),
  lastName: Joi.string().example("Simpson").required(),
}).label("UserDetails");

export const UserSpecPlus = UserSpec.keys({
  _id: IdSpec,
  __v: Joi.number(),
}).label("UserDetailsPlus");

export const UserArray = Joi.array().items(UserSpecPlus).label("UserArray");
  
export const CoffeeShopSpec = Joi.object()
  .keys({
    coffeeShopName: Joi.string().required().example("Trade"),
    lat: Joi.number().required(),
    lng: Joi.number().required(),
    description: Joi.string().required(),
    rating: Joi.string().required(),
  })
  .label("CoffeeShop");

export const CoffeeShopSpecPlus = CoffeeShopSpec.keys({
  _id: IdSpec,
  __v: Joi.number(),
}).label("CoffeeShopPlus");

export const CoffeeShopArraySpec = Joi.array().items(CoffeeShopSpecPlus).label("CoffeeShopArray");
  
export const LocationSpec = Joi.object()
  .keys({
    locationName: Joi.string().required().example("fav1"),
    userid: IdSpec,
    coffeeShops: CoffeeShopArraySpec,
  })
  .label("Location");

export const LocationSpecPlus = LocationSpec.keys({
  _id: IdSpec,
  __v: Joi.number(),
}).label("LocationPlus");

export const LocationArraySpec = Joi.array().items(LocationSpecPlus).label("LocationArray");