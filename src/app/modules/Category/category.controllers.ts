import { Request, RequestHandler, Response } from "express";
import httpStatus from "http-status";
import catchAsync from "../../utils/catchAsync";
import sendResponse from "../../utils/sendResponse";
import CategoryServices from "./category.services";

const createCategory: RequestHandler = catchAsync(
  async (req: Request, res: Response) => {
    const { title } = req.body;
    const userId = req.userData?._id;
    const result = await CategoryServices.createCategory({
      title,
      user: userId,
    });

    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: "Category created successfully!",
      data: result,
    });
  },
);

const getCategories: RequestHandler = catchAsync(
  async (req: Request, res: Response) => {
    const userId = req.userData?._id;
    const searchQuery = req.query?.search;

    const result = await CategoryServices.getCategories(userId, searchQuery as string);

    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: "Categories retrieved successfully!",
      data: result,
    });
  },
);

const updateCategory: RequestHandler = catchAsync(
  async (req: Request, res: Response) => {
    const userId = req.userData?._id;
    const ctgId = req.params.id;
    const result = await CategoryServices.updateCategory(
      userId,
      ctgId,
      req.body,
    );

    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: "Category updated successfully!",
      data: result,
    });
  },
);

const deleteCategory: RequestHandler = catchAsync(
  async (req: Request, res: Response) => {
    const userId = req.userData?._id;
    const ctgId = req.params.id;
    const result = await CategoryServices.deleteCategory(userId, ctgId);

    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: "Category deleted successfully!",
      data: result,
    });
  },
);

const CategoryControllers = {
  createCategory,
  getCategories,
  updateCategory,
  deleteCategory,
};

export default CategoryControllers;
