/* eslint-disable no-unused-vars */
import { Date, Model, Types } from "mongoose";

export interface TCategory {
  _id?: string;
  user: Types.ObjectId;
  title: string;
  createdAt?: Date;
  updatedAt?: Date;
}

export interface CategoryModel extends Model<TCategory> {
  isCategoryExists(id: string): Promise<TCategory | null>;
}
