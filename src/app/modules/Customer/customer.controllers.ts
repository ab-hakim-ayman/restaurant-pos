import { Request, RequestHandler, Response } from "express";
import httpStatus from "http-status";
import catchAsync from "../../utils/catchAsync";
import sendResponse from "../../utils/sendResponse";
import CustomerServices from "./customer.services";

const createCustomer: RequestHandler = catchAsync(
  async (req: Request, res: Response) => {
    const { name, phone, address, visit_count } = req.body;
    const userId = req.userData?._id;

    const result = await CustomerServices.createCustomer({
      name,
      phone,
      address,
      visit_count,
      user: userId,
    });

    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: "Customer created successfully!",
      data: result,
    });
  },
);

const getCustomers: RequestHandler = catchAsync(
  async (req: Request, res: Response) => {
    const userId = req.userData?._id;
    const searchQuery = (req.query?.search as string) || "";

    const result = await CustomerServices.getCustomers(userId, searchQuery);

    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: "Customers retrieved successfully!",
      data: result,
    });
  },
);

const updateCustomer: RequestHandler = catchAsync(
  async (req: Request, res: Response) => {
    const userId = req.userData?._id;
    const customerId = req.params.id;

    const result = await CustomerServices.updateCustomer(
      userId,
      customerId,
      req.body,
    );

    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: "Customer updated successfully!",
      data: result,
    });
  },
);

const deleteCustomer: RequestHandler = catchAsync(
  async (req: Request, res: Response) => {
    const userId = req.userData?._id;
    const customerId = req.params.id;

    const result = await CustomerServices.deleteCustomer(userId, customerId);

    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: "Customer deleted successfully!",
      data: result,
    });
  },
);

const CustomerControllers = {
  createCustomer,
  getCustomers,
  updateCustomer,
  deleteCustomer,
};

export default CustomerControllers;
