import bcrypt from "bcrypt";
import httpStatus from "http-status";
import { Schema, model, Types } from "mongoose";
import AppError from "../../errors/AppError";
import { TAddon, AddonModel } from "./addon.interfaces";
import { User } from "../User/user.model";

const addonSchema = new Schema<TAddon, AddonModel>(
  {
    title: {
      type: String,
      required: [true, "Addon title is required!"],
    },
    user: {
      type: Schema.Types.ObjectId,
      ref: "User",
    },
    price: {
      type: Number,
      required: [true, "Addon price is required!"],
    },
  },
  {
    timestamps: true,
  },
);

addonSchema.statics.isAddonExists = async function (id: string) {
  return await this.findById(id);
};

export const Addon = model<TAddon, AddonModel>("Addon", addonSchema);
