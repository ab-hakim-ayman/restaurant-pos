import bcrypt from "bcrypt";
import httpStatus from "http-status";
import { Schema, model, Types } from "mongoose";
import AppError from "../../errors/AppError";
import { TCategory, CategoryModel } from "./category.interfaces";
import { User } from "../User/user.model";

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
