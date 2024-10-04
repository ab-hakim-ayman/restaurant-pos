import { Schema, model } from "mongoose";
import { CategoryModel, TCategory } from "./category.interfaces";

const categorySchema = new Schema<TCategory, CategoryModel>(
  {
    title: {
      type: String,
      required: [true, "Category title is required!"],
    },
    user: {
      type: Schema.Types.ObjectId,
      ref: "User",
    },
  },
  {
    timestamps: true,
  },
);

categorySchema.statics.isCategoryExists = async function (id: string) {
  return await this.findById(id);
};

export const Category = model<TCategory, CategoryModel>(
  "Category",
  categorySchema,
);
