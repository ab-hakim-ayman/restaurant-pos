import express from "express";
import AuthGuard from "../../../middlewares/AuthGuard";
import validateRequest from "../../../middlewares/validateRequest";
import AuthValidations from "../auth.validations";
import UserAuthControllers from "./user_auth.controllers";

const router = express.Router();

router.post(
  "/login",
  validateRequest(AuthValidations.loginValidation),
  UserAuthControllers.loginUser,
);

router.post(
  "/change-password",
  AuthGuard("user"),
  validateRequest(AuthValidations.changePasswordValidation),
  UserAuthControllers.changePassword,
);

router.post(
  "/forgot-password",
  validateRequest(AuthValidations.forgotPasswordValidation),
  UserAuthControllers.forgotPassword,
);

router.post(
  "/reset-password",
  validateRequest(AuthValidations.resetPasswordValidation),
  UserAuthControllers.resetPassword,
);

const UserAuthRoutes = router;

export default UserAuthRoutes;
