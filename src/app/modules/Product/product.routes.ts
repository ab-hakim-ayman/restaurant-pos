import express from "express";
import AuthGuard from "../../middlewares/AuthGuard";
import validateRequest from "../../middlewares/validateRequest";
import ProductControllers from "./product.controllers";
import ProductValidations from "./product.validations";

const router = express.Router();

router.post(
  "/create",
  validateRequest(ProductValidations.createProductValidation),
  ProductControllers.createProduct,
);

router.get("/", ProductControllers.getProducts);

router.get("/:id", ProductControllers.getProduct);

router.put(
  "/:id",
  validateRequest(ProductValidations.updateProductValidation),
  ProductControllers.updateProduct,
);

router.delete("/:id", ProductControllers.deleteProduct);

router.put("/toggle-status/:id", ProductControllers.toggleProductStatus);

const ProductRoutes = router;

export default ProductRoutes;
