import { Request, RequestHandler, Response } from "express";
import httpStatus from "http-status";
import catchAsync from "../../../utils/catchAsync";
import sendResponse from "../../../utils/sendResponse";
import { TUser } from "../../User/user.interfaces";
import UserAuthServices from "./user_auth.services";

const loginUser: RequestHandler = catchAsync(
  async (req: Request, res: Response) => {
    const result = await UserAuthServices.loginUser(req.body);

    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: "User logged in successfully!",
      data: result,
    });
  },
);

const changePassword: RequestHandler = catchAsync(
  async (req: Request, res: Response) => {
    const result = await UserAuthServices.changePassword(
      req.userData as TUser,
      req.body,
    );

    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: "Password changed successfully!",
      data: result,
    });
  },
);

const forgotPassword: RequestHandler = catchAsync(
  async (req: Request, res: Response) => {
    await UserAuthServices.forgotPassword(req.body.email);

    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: "Email sent successfully!",
      data: null,
    });
  },
);

const resetPassword: RequestHandler = catchAsync(
  async (req: Request, res: Response) => {
    await UserAuthServices.resetPassword(req.body);

    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: "Password reset successfully!",
      data: null,
    });
  },
);

const UserAuthControllers = {
  loginUser,
  changePassword,
  forgotPassword,
  resetPassword,
};

export default UserAuthControllers;
