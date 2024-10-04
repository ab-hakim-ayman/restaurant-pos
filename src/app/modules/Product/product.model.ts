import bcrypt from "bcrypt";
import httpStatus from "http-status";
import { Schema, model } from "mongoose";
import AppError from "../../errors/AppError";
import { TProduct, ProductModel } from "./product.interfaces";

const productSchema = new Schema<TProduct, ProductModel>(
  {
    product_name: {
      type: String,
      required: [true, "Restaurant name is required!"],
    },
    status: {
      type: String,
      enum: ["active", "blocked"],
      default: "active",
    },
    isDeleted: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  },
);

productSchema.statics.isProductExists = async function (id: string) {
  const product = await this.findById(id).select("+product_name");
  if (!product) {
    throw new AppError(httpStatus.NOT_FOUND, "Product not found!");
  }
  return product;
};

productSchema.statics.findProductByName = async function (
  product_name: string,
) {
  const product = await this.findOne({ product_name });
  if (!product) {
    throw new AppError(httpStatus.NOT_FOUND, "Product not found!");
  }
  return product;
};

export const Product = model<TProduct, ProductModel>("Product", productSchema);
