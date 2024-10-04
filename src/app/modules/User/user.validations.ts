import { z } from "zod";

const registerUserValidation = z.object({
  body: z.object({
    company_name: z
      .string({
        required_error: "Company name is required!",
      })
      .min(3, {
        message: "Company name must be at least 3 characters long!",
      }),
    email: z.string().email({
      message: "Invalid email address!",
    }),
    phone: z.string({
      required_error: "Phone number is required!",
    }),
    address: z.string({
      required_error: "Address is required!",
    }),
    logo: z.object(
      {
        url: z.string().url({
          message: "Invalid URL!",
        }),
        public_id: z.string(),
      },
      {
        required_error: "Logo is required!",
        invalid_type_error:
          "Logo must be an object with 'url' and 'public_id' keys!",
      },
    ),
    password: z.string().refine(
      (data) => {
        // password must contain at least 8 characters, 1 uppercase letter, 1 lowercase letter, 1 number, and 1 special character
        const passwordRegex =
          /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[^a-zA-Z0-9])(?!.*\s).{8,}$/;
        return passwordRegex.test(data);
      },
      {
        message:
          "Password must contain at least 8 characters, 1 uppercase letter, 1 lowercase letter, 1 number, and 1 special character!",
      },
    ),
  }),
});

const updateUserValidation = z.object({
  body: z.object({
    company_name: z
      .string()
      .min(3, {
        message: "Company name must be at least 3 characters long!",
      })
      .optional(),
    email: z
      .string()
      .email({
        message: "Invalid email address!",
      })
      .optional(),
    phone: z
      .string({
        required_error: "Phone number is required!",
      })
      .optional(),
    address: z
      .string({
        required_error: "Address is required!",
      })
      .optional(),
    logo: z
      .string()
      .url({
        message: "Invalid URL!",
      })
      .optional(),
  }),
});

const UserValidations = {
  registerUserValidation,
  updateUserValidation,
};

export default UserValidations;
