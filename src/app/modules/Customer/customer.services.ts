import httpStatus from "http-status";
import AppError from "../../errors/AppError";
import { TCustomer } from "./customer.interfaces";
import { Customer } from "./customer.model";

const createCustomer = async (customer: TCustomer) => {
  const newCustomer = await Customer.create(customer);
  return newCustomer;
};

const getCustomers = async (userId: string, searchQuery: string = "") => {
  const queryCondition: any = { user: userId };

  if (searchQuery.trim()) {
    queryCondition.name = { $regex: searchQuery.trim(), $options: "i" };
  }

  const customers = await Customer.find(queryCondition);

  return customers;
};

const updateCustomer = async (
  userId: string,
  customerId: string,
  customerData: Partial<TCustomer>,
) => {
  const updatedCustomer = await Customer.findOneAndUpdate(
    { _id: customerId, user: userId },
    customerData,
    { new: true, runValidators: true },
  );

  if (!updatedCustomer) {
    throw new AppError(httpStatus.NOT_FOUND, "Customer not found!");
  }

  return updatedCustomer;
};

const deleteCustomer = async (userId: string, customerId: string) => {
  const deletedCustomer = await Customer.findOneAndDelete({
    _id: customerId,
    user: userId,
  });

  if (!deletedCustomer) {
    throw new AppError(httpStatus.NOT_FOUND, "Customer not found!");
  }

  return deletedCustomer;
};

const CustomerServices = {
  createCustomer,
  getCustomers,
  updateCustomer,
  deleteCustomer,
};

export default CustomerServices;
