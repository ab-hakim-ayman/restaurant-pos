import { z } from "zod";

const loginValidation = z.object({
  body: z.object({
    email: z.string().email({
      message: "Invalid email address!",
    }),
    password: z.string().min(8, {
      message: "Password must be at least 8 characters long!",
    }),
  }),
});

const changePasswordValidation = z.object({
  body: z.object({
    oldPassword: z.string().min(8, {
      message: "Old password must be at least 8 characters long!",
    }),
    newPassword: z.string().refine((data) => {
      // password must contain at least 8 characters, 1 uppercase letter, 1 lowercase letter, 1 number, and 1 special character
      const passwordRegex =
        /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[^a-zA-Z0-9])(?!.*\s).{8,}$/;
      return passwordRegex.test(data);
    }),
  }),
});

const forgotPasswordValidation = z.object({
  body: z.object({
    email: z.string().email({
      message: "Invalid email address!",
    }),
  }),
});

const resetPasswordValidation = z.object({
  body: z.object({
    password: z
      .string({
        required_error: "Password is required!",
      })
      .refine(
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
    token: z.string({
      required_error: "Token is required!",
    }),
  }),
});

const AuthValidations = {
  loginValidation,
  changePasswordValidation,
  forgotPasswordValidation,
  resetPasswordValidation,
};

export default AuthValidations;
