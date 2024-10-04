import express from "express";
import AuthGuard from "../../middlewares/AuthGuard";
import validateRequest from "../../middlewares/validateRequest";
import UserControllers from "./user.controllers";
import UserValidations from "./user.validations";

const router = express.Router();

router.post(
  "/register",
  validateRequest(UserValidations.registerUserValidation),
  UserControllers.registerUser,
);

router.get("/",
  //  AuthGuard("admin"),
    UserControllers.getUsers);

router.get("/:id", UserControllers.getUser);

router.put(
  "/update",
  AuthGuard("user"),
  validateRequest(UserValidations.updateUserValidation),
  UserControllers.updateUser,
);

router.delete("/:id", AuthGuard("admin"), UserControllers.deleteUser);

router.put(
  "/change-status/:id/:status",
  AuthGuard("admin"),
  UserControllers.changeUserStatus,
);

const UserRoutes = router;

export default UserRoutes;
