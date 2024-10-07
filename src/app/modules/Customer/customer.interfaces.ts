/* eslint-disable no-unused-vars */
import { Date, Model, Types } from "mongoose";

export interface TCustomer {
  _id?: string;
  user: Types.ObjectId;
  name: string;
  phone: string;
  address: string;
  visit_count?: number;
  createdAt?: Date;
  updatedAt?: Date;
}

export interface CustomerModel extends Model<TCustomer> {
  isCustomerExists(id: string): Promise<TCustomer | null>;
}
