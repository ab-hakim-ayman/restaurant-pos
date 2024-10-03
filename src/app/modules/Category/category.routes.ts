import express from "express";
import AuthGuard from "../../middlewares/AuthGuard";
import validateRequest from "../../middlewares/validateRequest";
import CategoryControllers from "./category.controllers";
import CategoryValidations from "./category.validations";

const router = express.Router();

router.post(
  "/create",
  validateRequest(CategoryValidations.createCategoryValidation),
  CategoryControllers.createCategory,
);

router.get("/", CategoryControllers.getCategories);

router.get("/:id", CategoryControllers.getCategory);

router.put(
  "/:id",
  validateRequest(CategoryValidations.updateCategoryValidation),
  CategoryControllers.updateCategory,
);

router.delete("/:id", CategoryControllers.deleteCategory);

router.put("/toggle-status/:id", CategoryControllers.toggleCategoryStatus);

const CategoryRoutes = router;

export default CategoryRoutes;
