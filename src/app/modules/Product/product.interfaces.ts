/* eslint-disable no-unused-vars */
import { Model } from "mongoose";

export interface TProduct {
  _id?: string;
  product_name: string;
  status?: "active" | "blocked";
  role: "user";
  isDeleted?: boolean;
}

export interface ProductModel extends Model<TProduct> {
  isProductExists(id: string): Promise<TProduct | null>;
  findProductByName(product_name: string): Promise<TProduct | null>;
}
