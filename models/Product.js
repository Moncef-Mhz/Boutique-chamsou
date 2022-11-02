import mongoose from "mongoose";

const productSchema = new mongoose.Schema(
  {
    Name: { type: String, required: true },
    Slug: { type: String, required: true, unique: true },
    Categories: { type: String, required: true },
    Image: { type: String, required: true },
    Price: { type: Number, required: true },
    Brand: { type: String, required: true },
    Taille: { type: Array, required: true },
    CountInStock: { type: Number, required: true, default: 0 },
    Descreption: { type: String, required: true },
  },
  {
    timestamps: true,
  }
);

const Product =
  mongoose.models.Product || mongoose.model("Product", productSchema);
export default Product;
