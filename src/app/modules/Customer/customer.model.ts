/* eslint-disable no-unused-vars */
import { Schema, model } from "mongoose";
import { CustomerModel, TCustomer } from "./customer.interfaces";

const customerSchema = new Schema<TCustomer, CustomerModel>(
  {
    name: {
      type: String,
      required: [true, "Customer name is required!"],
    },
    phone: {
      type: String,
      required: [true, "Customer phone number is required!"],
    },
    address: {
      type: String,
      required: [true, "Customer address is required!"],
    },
    visit_count: {
      type: Number,
      default: 0,
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

customerSchema.statics.isCustomerExists = async function (id: string) {
  return await this.findById(id);
};

export const Customer = model<TCustomer, CustomerModel>(
  "Customer",
  customerSchema,
);
