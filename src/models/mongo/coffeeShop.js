import Mongoose from "mongoose";

const { Schema } = Mongoose;

const coffeeShopSchema = new Schema({
  title: String,
  
  Locationid: {
    type: Schema.Types.ObjectId,
    ref: "Location",
  },
});

export const CoffeeShop = Mongoose.model("CoffeeShop", coffeeShopSchema);