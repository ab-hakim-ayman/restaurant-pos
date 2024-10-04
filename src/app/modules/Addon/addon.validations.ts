import { z } from "zod";

const createAddonValidation = z.object({
  body: z.object({
    title: z
      .string({
        required_error: "Addon title is required!",
      })
      .min(3, {
        message: "Addon title must be at least 3 characters long!",
      }),
    price: z
      .number({
        required_error: "Addon price is required!",
      })
      .min(0, {
        message: "Addon price must be a positive number!",
      }),
  }),
});

const updateAddonValidation = z.object({
  body: z.object({
    title: z
      .string()
      .min(3, {
        message: "Addon title must be at least 3 characters long!",
      })
      .optional(),
    price: z
      .number()
      .min(0, {
        message: "Addon price must be a positive number!",
      })
      .optional(),
  }),
});

const AddonValidations = {
  createAddonValidation,
  updateAddonValidation,
};

export default AddonValidations;
