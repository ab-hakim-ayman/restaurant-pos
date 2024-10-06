import { z } from "zod";

const createProductValidation = z.object({
  body: z.object({
    name: z
      .string({
        required_error: "Product name is required!",
      })
      .min(3, {
        message: "Product name must be at least 3 characters long!",
      }),
    category: z.string({
      required_error: "Category is required!",
    }),
    price: z
      .number({
        required_error: "Price is required!",
      })
      .positive({
        message: "Price must be a positive number!",
      }),
    stock: z
      .number({
        required_error: "Stock is required!",
      })
      .nonnegative({
        message: "Stock must be a non-negative number!",
      }),
    image: z.object({
      public_id: z.string({
        required_error: "Image public_id is required!",
      }),
      url: z
        .string({
          required_error: "Image URL is required!",
        })
        .url({
          message: "Invalid URL format!",
        }),
    }),
    variants: z
      .array(
        z.object({
          _id: z.string().optional(),
          title: z.string(),
          price: z.number().positive(),
        }),
      )
      .optional(),
    addons: z.array(z.string()).optional(),
  }),
});

const updateProductValidation = z.object({
  body: z.object({
    name: z
      .string()
      .min(3, {
        message: "Product name must be at least 3 characters long!",
      })
      .optional(),
    category: z.string().optional(),
    price: z.number().positive().optional(),
    stock: z.number().nonnegative().optional(),
    image: z
      .object({
        public_id: z.string().optional(),
        url: z.string().url().optional(),
      })
      .optional(),
    variants: z
      .array(
        z.object({
          _id: z.string().optional(),
          title: z.string(),
          price: z.number().positive(),
        }),
      )
      .optional(),
    addons: z.array(z.string()).optional(),
  }),
});

const ProductValidations = {
  createProductValidation,
  updateProductValidation,
};

export default ProductValidations;
