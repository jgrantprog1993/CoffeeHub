import Mongoose from "mongoose";

const { Schema } = Mongoose;

const coffeeShopSchema = new Schema({
  title: String,
  
  Categoryid: {
    type: Schema.Types.ObjectId,
    ref: "Category",
  },
});

export const CoffeeShop = Mongoose.model("CoffeeShop", coffeeShopSchema);