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

const AuthValidations = {
  loginValidation,
};

export default AuthValidations;
