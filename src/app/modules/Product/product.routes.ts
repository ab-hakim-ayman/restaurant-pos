import express from "express";
import validateRequest from "../../middlewares/validateRequest";
import ProductValidations from "./product.validations";
import { ProductControllers } from "./product.controllers";

const router = express.Router();

router.post(
  "/create",
  validateRequest(ProductValidations.createProductValidation),
  ProductControllers.createProduct,
);

router.get("/", ProductControllers.getProducts);

router.put(
  "/:id",
  validateRequest(ProductValidations.updateProductValidation),
  ProductControllers.updateProduct,
);

router.delete("/:id", ProductControllers.deleteProduct);

const ProductRoutes = router;

export default ProductRoutes;
