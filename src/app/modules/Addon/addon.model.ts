import { model, Schema } from "mongoose";
import { AddonModel, TAddon } from "./addon.interfaces";

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
