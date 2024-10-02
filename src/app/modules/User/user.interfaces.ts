/* eslint-disable no-unused-vars */
import { Model } from "mongoose";

export interface TUser {
  _id?: string;
  company_name: string;
  email: string;
  phone: string;
  address: string;
  logo: string;
  password: string;
  status?: "active" | "blocked";
  role: "user";
  isDeleted?: boolean;
}

export interface UserModel extends Model<TUser> {
  isUserExists(id: string): Promise<TUser | null>;
  isPasswordMatched(
    plainPassword: string,
    hashedPassword: string,
  ): Promise<boolean>;
  findUserByEmail(email: string): Promise<TUser | null>;
}
