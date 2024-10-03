/* eslint-disable no-unused-vars */
import { Model } from "mongoose";

export type TAdmin = {
  _id?: string;
  name: string;
  email: string;
  password: string;
  role: string;
};

export interface AdminModel extends Model<TAdmin> {
  isAdminExists(id: string): Promise<TAdmin | null>;
  isPasswordMatched(
    plainPassword: string,
    hashedPassword: string,
  ): Promise<boolean>;
}
