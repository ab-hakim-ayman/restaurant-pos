import { z } from "zod";

const createProductValidation = z.object({
  body: z.object({
    product_name: z
      .string({
        required_error: "Product name is required!",
      })
      .min(3, {
        message: "Product name must be at least 3 characters long!",
      }),
  }),
});

const updateProductValidation = z.object({
  body: z.object({
    product_name: z
      .string()
      .min(3, {
        message: "Product name must be at least 3 characters long!",
      })
      .optional(),
  }),
});

const ProductValidations = {
  createProductValidation,
  updateProductValidation,
};

export default ProductValidations;
