import Mongoose from "mongoose";

const { Schema } = Mongoose;

const coffeeShopSchema = new Schema({
  coffeeShopName: String,
  lat:Number,
  lng:Number,
  description:String,
  rating:Number,
  locationid: {
    type: Schema.Types.ObjectId,
    ref: "Location",
  },
});

export const CoffeeShop = Mongoose.model("CoffeeShops", coffeeShopSchema);