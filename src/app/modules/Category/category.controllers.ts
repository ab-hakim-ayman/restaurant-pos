import { Request, RequestHandler, Response } from "express";
import httpStatus from "http-status";
import catchAsync from "../../utils/catchAsync";
import sendResponse from "../../utils/sendResponse";
import CategoryServices from "./category.services";

const createCategory: RequestHandler = catchAsync(
  async (req: Request, res: Response) => {
    const result = await CategoryServices.createCategory(req.body);

    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: "Category created successfully!",
      data: result,
    });
  },
);

const toggleCategoryStatus: RequestHandler = catchAsync(
  async (req: Request, res: Response) => {
    const result = await CategoryServices.toggleCategoryStatus(req.params.id);

    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: "Category status updated successfully!",
      data: result,
    });
  },
);

const getCategory: RequestHandler = catchAsync(
  async (req: Request, res: Response) => {
    const result = await CategoryServices.getCategory(req.params.id);

    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: "Category retrieved successfully!",
      data: result,
    });
  },
);

const getCategories: RequestHandler = catchAsync(
  async (req: Request, res: Response) => {
    const result = await CategoryServices.getCategories();

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
    const result = await CategoryServices.updateCategory(
      req.body?._id,
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
    const result = await CategoryServices.deleteCategory(req.params.id);

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
  toggleCategoryStatus,
  getCategory,
  getCategories,
  updateCategory,
  deleteCategory,
};

export default CategoryControllers;
