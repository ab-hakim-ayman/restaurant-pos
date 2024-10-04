import { Request, RequestHandler, Response } from "express";
import httpStatus from "http-status";
import catchAsync from "../../utils/catchAsync";
import sendResponse from "../../utils/sendResponse";
import ProductServices from "./product.services";

const createProduct: RequestHandler = catchAsync(
  async (req: Request, res: Response) => {
    const result = await ProductServices.createProduct(req.body);

    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: "Product created successfully!",
      data: result,
    });
  },
);

const toggleProductStatus: RequestHandler = catchAsync(
  async (req: Request, res: Response) => {
    const result = await ProductServices.toggleProductStatus(req.params.id);

    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: "Product status updated successfully!",
      data: result,
    });
  },
);

const getProduct: RequestHandler = catchAsync(
  async (req: Request, res: Response) => {
    const result = await ProductServices.getProduct(req.params.id);

    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: "Product retrieved successfully!",
      data: result,
    });
  },
);

const getProducts: RequestHandler = catchAsync(
  async (req: Request, res: Response) => {
    const result = await ProductServices.getProducts();

    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: "Product retrieved successfully!",
      data: result,
    });
  },
);

const updateProduct: RequestHandler = catchAsync(
  async (req: Request, res: Response) => {
    const result = await ProductServices.updateProduct(req.body?._id, req.body);

    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: "Product updated successfully!",
      data: result,
    });
  },
);

const deleteProduct: RequestHandler = catchAsync(
  async (req: Request, res: Response) => {
    const result = await ProductServices.deleteProduct(req.params.id);

    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: "Product deleted successfully!",
      data: result,
    });
  },
);

const ProductControllers = {
  createProduct,
  toggleProductStatus,
  getProduct,
  getProducts,
  updateProduct,
  deleteProduct,
};

export default ProductControllers;
