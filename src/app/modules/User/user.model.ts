import bcrypt from "bcrypt";
import { Schema, model } from "mongoose";
import { TUser, UserModel } from "./user.interfaces";

const userSchema = new Schema<TUser, UserModel>(
  {
    company_name: {
      type: String,
      required: [true, "Restaurant name is required!"],
    },
    email: {
      type: String,
      required: [true, "Email is required!"],
      unique: true,
    },
    phone: {
      type: String,
      required: [true, "Phone number is required!"],
    },
    password: {
      type: String,
      required: [true, "Password is required!"],
      select: false,
    },
    address: {
      type: String,
      required: [true, "Address is required!"],
    },
    logo: {
      type: String,
      required: [true, "Logo is required!"],
    },
    role: {
      type: String,
      default: "user",
    },
    status: {
      type: String,
      enum: ["pending", "approved", "paused", "rejected", "blocked"],
      default: "pending",
    },
    isDeleted: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  },
);

//! pre save middleware/hook || hashing password
userSchema.pre("save", async function (next) {
  // eslint-disable-next-line @typescript-eslint/no-this-alias
  const user = this;
  if (user.isModified("password")) {
    user.password = await bcrypt.hash(user.password, 10);
  }
  next();
});

userSchema.statics.isUserExists = async function (id: string) {
  return await this.findById(id).select("+password");
};

userSchema.statics.isPasswordMatched = async function (
  plainPassword: string,
  hashedPassword: string,
) {
  return await bcrypt.compare(plainPassword, hashedPassword);
};

userSchema.statics.findUserByEmail = async function (email: string) {
  return await this.findOne({ email }).select("+password");
};

export const User = model<TUser, UserModel>("User", userSchema);
