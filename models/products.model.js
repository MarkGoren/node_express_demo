import mongoose from "mongoose";

const productsSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  info: {
    type: String,
    required: true,
  },
  cost: {
    type: Number,
    required: true,
  },
  img: {
    type: String,
    required: true,
  },
});

const Products = mongoose.model("Products", productsSchema);
export default Products;
