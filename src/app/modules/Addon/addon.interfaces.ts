/* eslint-disable no-unused-vars */
import { Date, Model, Types } from "mongoose";

export interface TAddon {
  _id?: string;
  user: Types.ObjectId;
  title: string;
  price: number;
  createdAt?: Date;
  updatedAt?: Date;
}

export interface AddonModel extends Model<TAddon> {
  isAddonExists(id: string): Promise<TAddon | null>;
}
