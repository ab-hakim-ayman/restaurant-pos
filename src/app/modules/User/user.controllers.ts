import { Request, RequestHandler, Response } from "express";
import httpStatus from "http-status";
import catchAsync from "../../utils/catchAsync";
import sendResponse from "../../utils/sendResponse";
import UserServices from "./user.services";

const registerUser: RequestHandler = catchAsync(
  async (req: Request, res: Response) => {
    const result = await UserServices.registerUser(req.body);

    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message:
        "Account registered successfully! Please wait for the admin to approve your account.",
      data: result,
    });
  },
);

const changeUserStatus: RequestHandler = catchAsync(
  async (req: Request, res: Response) => {
    const result = await UserServices.changeUserStatus(
      req.params.id,
      req.params.status,
    );

    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: "User status updated successfully!",
      data: result,
    });
  },
);

const getUser: RequestHandler = catchAsync(
  async (req: Request, res: Response) => {
    const result = await UserServices.getUser(req.params.id);

    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: "User retrieved successfully!",
      data: result,
    });
  },
);

const getUsers: RequestHandler = catchAsync(
  async (req: Request, res: Response) => {
    const result = await UserServices.getUsers(req.query);

    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: "Users retrieved successfully!",
      data: result,
    });
  },
);

const updateUser: RequestHandler = catchAsync(
  async (req: Request, res: Response) => {
    const result = await UserServices.updateUser(req?.userData?._id, req.body);

    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: "User updated successfully!",
      data: result,
    });
  },
);

const deleteUser: RequestHandler = catchAsync(
  async (req: Request, res: Response) => {
    const result = await UserServices.deleteUser(req.params.id);

    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: "User deleted successfully!",
      data: result,
    });
  },
);

const UserControllers = {
  registerUser,
  changeUserStatus,
  getUser,
  getUsers,
  updateUser,
  deleteUser,
};

export default UserControllers;
