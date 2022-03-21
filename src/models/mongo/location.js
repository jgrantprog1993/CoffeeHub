import Mongoose from "mongoose";

const { Schema } = Mongoose;

const locationSchema = new Schema({
  locationName: String,
  userid: {
    type: Schema.Types.ObjectId,
    ref: "User",
  },
});

export const Location = Mongoose.model("Location", locationSchema);