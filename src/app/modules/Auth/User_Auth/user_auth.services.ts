import bcrypt from "bcrypt";
import httpStatus from "http-status";
import jwt, { JwtPayload } from "jsonwebtoken";
import config from "../../../config";
import ResetPasswordTemplate from "../../../EmailTemplates/ResetPasswordTemplate";
import AppError from "../../../errors/AppError";
import { sendEmail } from "../../../utils/sendEmail";
import { UserStatus } from "../../User/user.constant";
import { TUser } from "../../User/user.interfaces";
import { User } from "../../User/user.model";
import { TChangePassword, TLogin, TResetPassword } from "../auth.interfaces";
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

const changePassword = async (userData: TUser, payload: TChangePassword) => {
  const { oldPassword, newPassword } = payload;

  // check if the user is exist
  const user = await User.findOne({
    _id: userData._id,
    email: userData.email,
  }).select("+password");

  if (!user) {
    throw new AppError(httpStatus.NOT_FOUND, "The user is not found!");
  }

  // check if the user is not approved by the authority
  if (user?.status !== UserStatus.Approved) {
    throw new AppError(
      httpStatus.FORBIDDEN,
      "You have no permission to change the password! Please contact to the authority.",
    );
  }

  // check if the password is correct
  const isPasswordMatch = await User.isPasswordMatched(
    oldPassword,
    user?.password,
  );

  if (!isPasswordMatch) {
    throw new AppError(httpStatus.FORBIDDEN, "Password does not match!");
  }

  const hashedPassword = await bcrypt.hash(
    newPassword,
    Number(config.bcrypt_salt_round),
  );

  const result = await User.findByIdAndUpdate(userData._id, {
    password: hashedPassword,
  });

  return result;
};

const forgotPassword = async (email: string) => {
  // check if the user is exist with the email
  const user = await User.findOne({ email });
  if (!user) {
    throw new AppError(httpStatus.NOT_FOUND, "User not found");
  }

  // check if the user status and isDeleted. send different error message for different status
  if (user?.status !== UserStatus.Approved || user?.isDeleted) {
    throw new AppError(
      httpStatus.FORBIDDEN,
      "You can not access the system! Maybe your subscription is expired or had any other problem. Please contact to the authority .",
    );
  }

  const jwtPayload = {
    id: user?._id,
    email: user?.email,
  };

  const resetToken = createToken(
    jwtPayload,
    config.password_reset_secret,
    config.password_reset_expiration,
  );

  const resetUILink = `${config.client_url}/reset-pass?token=${resetToken}`;

  const template = ResetPasswordTemplate(
    user?.company_name,
    user?.email,
    resetUILink,
  );

  await sendEmail(user?.email, "Reset Your Password", template);
  return;
};

const resetPassword = async (payload: TResetPassword) => {
  const { token, password } = payload;

  if (!token) {
    throw new AppError(httpStatus.BAD_REQUEST, "You are not authorized!");
  }

  const decoded = jwt.verify(token, config.password_reset_secret) as JwtPayload;

  const user = await User.isUserExists(decoded?.id);

  if (!user) {
    throw new AppError(httpStatus.NOT_FOUND, "User not found");
  }

  // check if the user is not approved or deleted
  if (user?.status !== UserStatus.Approved || user?.isDeleted) {
    throw new AppError(
      httpStatus.FORBIDDEN,
      "You can not access the system! Maybe your subscription is expired or had any other problem. Please contact to the authority.",
    );
  }

  const hashedPassword = await bcrypt.hash(
    password,
    Number(config.bcrypt_salt_round),
  );

  const result = await User.findOneAndUpdate(
    {
      _id: decoded.id,
    },
    {
      password: hashedPassword,
    },
  );
  return result;
};

const UserAuthServices = {
  loginUser,
  changePassword,
  forgotPassword,
  resetPassword,
};

export default UserAuthServices;
