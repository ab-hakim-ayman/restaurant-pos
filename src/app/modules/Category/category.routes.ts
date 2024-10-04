import express from "express";
import AuthGuard from "../../middlewares/AuthGuard";
import validateRequest from "../../middlewares/validateRequest";
import CategoryControllers from "./category.controllers";
import CategoryValidations from "./category.validations";

const router = express.Router();

router.post(
  "/create",
  AuthGuard(),
  validateRequest(CategoryValidations.createCategoryValidation),
  CategoryControllers.createCategory,
);

router.get("/", AuthGuard(), CategoryControllers.getCategories);

router.put(
  "/:id",
  AuthGuard(),
  validateRequest(CategoryValidations.updateCategoryValidation),
  CategoryControllers.updateCategory,
);

router.delete("/:id", AuthGuard(), CategoryControllers.deleteCategory);

const CategoryRoutes = router;

export default CategoryRoutes;
