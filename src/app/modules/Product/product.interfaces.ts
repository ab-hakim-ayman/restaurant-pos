/* eslint-disable no-unused-vars */
import { Model, Types } from "mongoose";

export interface TProduct {
  _id?: string;
  name: string;
  category: Types.ObjectId;
  price: number;
  stock: number;
  image: {
    public_id: string;
    url: string;
  };
  variants?: Array<{
    _id: string;
    title: string;
    price: number;
  }>;
  addons?: Array<{
    _id: Types.ObjectId;
  }>;
  user?: Types.ObjectId;
}

export interface ProductModel extends Model<TProduct> {
  isProductExists(id: string): Promise<TProduct | null>;
  findProductByName(product_name: string): Promise<TProduct | null>;
}
