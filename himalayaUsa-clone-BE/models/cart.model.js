import mongoose from "mongoose";

const cartSchema = new mongoose.Schema(
  {},
  {
    timestaps: true,
    collection: "cart",
    strict: false,
    versionKey:false,
  }
);
const cartModel = mongoose.model("cart", cartSchema);
export default cartModel;
