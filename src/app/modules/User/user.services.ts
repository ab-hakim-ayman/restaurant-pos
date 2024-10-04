import { UserStatusArray } from "./user.constant";
import { TUser } from "./user.interfaces";
import { User } from "./user.model";

const registerUser = async (user: TUser) => {
  const newUser = await User.create(user);
  return newUser;
};

const changeUserStatus = async (id: string, status: string) => {
  const user = await User.isUserExists(id);

  if (!user) {
    throw new Error("User not found");
  }

  const isStatusValid = Object.values(UserStatusArray).includes(status);

  if (!isStatusValid) {
    throw new Error("Invalid user status");
  }

  const updatedUser = await User.findByIdAndUpdate(
    id,
    { status },
    { new: true },
  );
  return updatedUser;
};

const getUser = async (id: string) => {
  const user = await User.isUserExists(id);

  return user;
};

const getUsers = async (searchQuery:Record<string, unknown>) => {
  const searchFields = ["name", "email", "phone", "address", "status"];
  const { search, status } = searchQuery;

  const filterQuery:Record<string, unknown> = {};

  if (status) {
    filterQuery.status = status;
  }
  if (search) {
    filterQuery.$or = searchFields.map((field) => ({
      [field]: { $regex: search, $options: "i" },
    }));
  }

  const users = await User.find(filterQuery);
  return users;
};

const updateUser = async (id: string, user: TUser) => {
  // separate the password from the user object. We don't want to update the password here.
  // eslint-disable-next-line no-unused-vars, @typescript-eslint/no-unused-vars
  const { password, ...rest } = user;
  const updated = await User.findByIdAndUpdate(id, rest, { new: true });

  return updated;
};

const deleteUser = async (id: string) => {
  const deleted = await User.findByIdAndUpdate(
    id,
    { isDeleted: true },
    { new: true },
  );

  return deleted;
};

const UserServices = {
  registerUser,
  changeUserStatus,
  getUser,
  getUsers,
  updateUser,
  deleteUser,
};

export default UserServices;
