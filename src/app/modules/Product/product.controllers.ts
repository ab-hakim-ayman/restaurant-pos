import { Request, RequestHandler, Response } from "express";
import catchAsync from "../../utils/catchAsync";
import sendResponse from "../../utils/sendResponse";
import httpStatus from "http-status";
import { ProductServices } from "./product.services";

const createProduct: RequestHandler = catchAsync(
  async (req: Request, res: Response) => {
    const userId = req.userData?._id;
    const productData = req.body;

    const result = await ProductServices.createProduct(userId, productData);

    sendResponse(res, {
      statusCode: httpStatus.CREATED,
      success: true,
      message: "Product created successfully!",
      data: result,
    });
  },
);

const updateProduct: RequestHandler = catchAsync(
  async (req: Request, res: Response) => {
    const userId = req.userData?._id;
    const productId = req.params.id;
    const updateData = req.body;

    const modification = {
      variants: req.body.variantsToAdd,
      removeVariants: req.body.variantsToRemove,
      addons: req.body.addonsToAdd,
      removeAddons: req.body.addonsToRemove,
    };

    const updatedProduct = await ProductServices.updateProduct(
      userId,
      productId,
      updateData,
      modification,
    );

    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: "Product updated successfully!",
      data: updatedProduct,
    });
  },
);

const getProducts: RequestHandler = catchAsync(
  async (req: Request, res: Response) => {
    const userId = req.userData?._id;
    const searchQuery = req.query?.search as string | undefined;

    const result = await ProductServices.getProducts(userId, searchQuery);

    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: "Products retrieved successfully!",
      data: result,
    });
  },
);

const deleteProduct: RequestHandler = catchAsync(
  async (req: Request, res: Response) => {
    const userId = req.userData?._id;
    const productId = req.params.id;

    const result = await ProductServices.deleteProduct(userId, productId);

    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: "Product deleted successfully!",
      data: result,
    });
  },
);

export const ProductControllers = {
  createProduct,
  updateProduct,
  getProducts,
  deleteProduct,
};
