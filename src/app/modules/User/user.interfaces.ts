/* eslint-disable no-unused-vars */
import { Model } from "mongoose";

export enum UserStatus {
  Pending = "pending",
  Approved = "approved",
  Paused = "paused",
  Rejected = "rejected",
  Blocked = "blocked",
}

export type TLogo = {
    url: string;
    public_id: string
  }
  
export interface TUser {
  _id?: string;
  company_name: string;
  email: string;
  phone: string;
  address: string;
  logo: TLogo;
  password: string;
  status?: UserStatus;
  role: "user";
  isDeleted?: boolean;
  createdAt?: Date;
  updatedAt?: Date;
}

export interface UserModel extends Model<TUser> {
  isUserExists(id: string): Promise<TUser | null>;
  isPasswordMatched(
    plainPassword: string,
    hashedPassword: string,
  ): Promise<boolean>;
  findUserByEmail(email: string): Promise<TUser | null>;
}
