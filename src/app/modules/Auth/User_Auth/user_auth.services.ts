import httpStatus from "http-status";
import config from "../../../config";
import AppError from "../../../errors/AppError";
import { User } from "../../User/user.model";
import { TLogin } from "../auth.interfaces";
import { createToken } from "../auth.utils";

const loginUser = async (payload: TLogin) => {
  const { email, password } = payload;

  // check if the user is exist
  const user = await User.findUserByEmail(email);

  if (!user) {
    throw new AppError(
      httpStatus.NOT_FOUND,
      "User not found! Please register first.",
    );
  }

  // check if the user is blocked
  if (user?.status === "blocked") {
    throw new AppError(
      httpStatus.FORBIDDEN,
      "You can not access the system! Maybe your subscription is expired or had any other problem. Please contact to the authority .",
    );
  }

  // check if the user is deleted
  if (user?.isDeleted) {
    throw new AppError(
      httpStatus.FORBIDDEN,
      "You are unauthorized to login! Please contact to the authority.",
    );
  }

  const isPasswordMatch = await User.isPasswordMatched(password, user.password);

  if (!isPasswordMatch) {
    throw new AppError(
      httpStatus.FORBIDDEN,
      "Wrong password! Please try again.",
    );
  }

  const jwtPayload = {
    id: user?._id,
    email: user?.email,
    role: user?.role,
  };

  const accessToken = createToken(
    jwtPayload,
    config.jwt_secret,
    config.jwt_expiration,
  );
  const userWithoutPassword = await User.findById(user._id);

  return { accessToken, user: userWithoutPassword };
};

const UserAuthServices = {
  loginUser,
};

export default UserAuthServices;
