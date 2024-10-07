import express from "express";
import AuthGuard from "../../middlewares/AuthGuard";
import validateRequest from "../../middlewares/validateRequest";
import CategoryControllers from "./category.controllers";
import CategoryValidations from "./category.validations";

const router = express.Router();

router.post(
  "/create",
  AuthGuard("user"),
  validateRequest(CategoryValidations.createCategoryValidation),
  CategoryControllers.createCategory,
);

router.get("/", AuthGuard("user"), CategoryControllers.getCategories);

router.put(
  "/:id",
  AuthGuard("user"),
  validateRequest(CategoryValidations.updateCategoryValidation),
  CategoryControllers.updateCategory,
);

router.delete("/:id", AuthGuard("user"), CategoryControllers.deleteCategory);

const CategoryRoutes = router;

export default CategoryRoutes;
