import { z } from "zod";

const createCategoryValidation = z.object({
  body: z.object({
    category_name: z
      .string({
        required_error: "Category name is required!",
      })
      .min(3, {
        message: "Category name must be at least 3 characters long!",
      }),
  }),
});

const updateCategoryValidation = z.object({
  body: z.object({
    category_name: z
      .string()
      .min(3, {
        message: "Category name must be at least 3 characters long!",
      })
      .optional(),
  }),
});

const CategoryValidations = {
  createCategoryValidation,
  updateCategoryValidation,
};

export default CategoryValidations;
