import { z } from "zod";

const createCustomerValidation = z.object({
  body: z.object({
    name: z
      .string({
        required_error: "Customer name is required!",
      })
      .min(3, {
        message: "Customer name must be at least 3 characters long!",
      }),
    phone: z
      .string({
        required_error: "Customer phone number is required!",
      })
      .regex(/^\+880\d{10}$/, {
        message: "Phone number is invalid! Use valid E.164 format.",
      }),
    address: z
      .string({
        required_error: "Customer address is required!",
      })
      .min(5, {
        message: "Address must be at least 5 characters long!",
      }),
    visit_count: z
      .number()
      .min(0, {
        message: "Visit count cannot be negative!",
      })
      .optional(),
  }),
});

const updateCustomerValidation = z.object({
  body: z.object({
    name: z
      .string()
      .min(3, {
        message: "Customer name must be at least 3 characters long!",
      })
      .optional(),
    phone: z
      .string()
      .regex(/^\+?[1-9]\d{1,14}$/, {
        message: "Phone number is invalid! Use valid E.164 format.",
      })
      .optional(),
    address: z
      .string()
      .min(5, {
        message: "Address must be at least 5 characters long!",
      })
      .optional(),
    visit_count: z
      .number()
      .min(0, {
        message: "Visit count cannot be negative!",
      })
      .optional(),
  }),
});

const CustomerValidations = {
  createCustomerValidation,
  updateCustomerValidation,
};

export default CustomerValidations;
