import { Request, RequestHandler, Response } from "express";
import httpStatus from "http-status";
import catchAsync from "../../utils/catchAsync";
import sendResponse from "../../utils/sendResponse";
import AddonServices from "./addon.services";

const createAddon: RequestHandler = catchAsync(
  async (req: Request, res: Response) => {
    const { title, price } = req.body;
    const userId = req.userData?._id;
    const result = await AddonServices.createAddon({
      title,
      price,
      user: userId,
    });

    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: "Addon created successfully!",
      data: result,
    });
  },
);

const getAddons: RequestHandler = catchAsync(
  async (req: Request, res: Response) => {
    const userId = req.userData?._id;
    const searchQuery = req.query?.search;

    const result = await AddonServices.getAddons(userId, searchQuery as string);

    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: "Addons retrieved successfully!",
      data: result,
    });
  },
);

const updateAddon: RequestHandler = catchAsync(
  async (req: Request, res: Response) => {
    const userId = req.userData?._id;
    const ctgId = req.params.id;
    const result = await AddonServices.updateAddon(userId, ctgId, req.body);

    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: "Addon updated successfully!",
      data: result,
    });
  },
);

const deleteAddon: RequestHandler = catchAsync(
  async (req: Request, res: Response) => {
    const userId = req.userData?._id;
    const ctgId = req.params.id;
    const result = await AddonServices.deleteAddon(userId, ctgId);

    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: "Addon deleted successfully!",
      data: result,
    });
  },
);

const AddonControllers = {
  createAddon,
  getAddons,
  updateAddon,
  deleteAddon,
};

export default AddonControllers;
