import httpStatus from "http-status";
import { Schema, model } from "mongoose";
import AppError from "../../errors/AppError";
import { ProductModel, TProduct } from "./product.interfaces";

const productSchema = new Schema<TProduct>(
  {
    name: {
      type: String,
      required: [true, "Product name is required!"],
    },
    category: {
      type: Schema.Types.ObjectId,
      ref: "Category",
    },
    price: {
      type: Number,
      required: [true, "Price is required!"],
    },
    stock: {
      type: Number,
      required: [true, "Stock is required!"],
    },
    image: {
      public_id: {
        type: String,
        required: [true, "Image public_id is required!"],
      },
      url: {
        type: String,
        required: [true, "Image URL is required!"],
      },
    },
    variants: [
      {
        _id: { type: String },
        title: { type: String },
        price: { type: Number },
      },
    ],
    addons: [
      {
        type: Schema.Types.ObjectId,
        ref: "Addon",
      },
    ],
    user: {
      type: Schema.Types.ObjectId,
      ref: "User",
    },
  },
  {
    timestamps: true,
  },
);

productSchema.statics.isProductExists = async function (id: string) {
  const product = await this.findById(id);
  if (!product) {
    throw new AppError(httpStatus.NOT_FOUND, "Product not found!");
  }
  return product;
};

export const Product = model<TProduct, ProductModel>("Product", productSchema);
