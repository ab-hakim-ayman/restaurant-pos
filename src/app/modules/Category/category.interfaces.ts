/* eslint-disable no-unused-vars */
import { Model } from "mongoose";

export interface TCategory {
  _id?: string;
  category_name: string;
  status?: "active" | "blocked";
  role: "user";
  isDeleted?: boolean;
}

export interface CategoryModel extends Model<TCategory> {
  isCategoryExists(id: string): Promise<TCategory | null>;
  findCategoryByName(category_name: string): Promise<TCategory | null>;
}
