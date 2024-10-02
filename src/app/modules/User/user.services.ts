import { TUser } from './user.interfaces';
import { User } from './user.model';

const registerUser = async (user: TUser) => {
	const newUser = await User.create(user);
	return newUser;
};

const toggleUserStatus = async (id: string) => {
	const user = await User.isUserExists(id);
	const status = user?.status === 'active' ? 'blocked' : 'active';

	const updatedUser = await User.findByIdAndUpdate(id, { status }, { new: true });
	return updatedUser;
};

const getUser = async (id: string) => {
	const user = await User.isUserExists(id);

	return user;
};

const getUsers = async () => {
	const users = await User.find();

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
	const deleted = await User.findByIdAndUpdate(id, { isDeleted: true }, { new: true });

	return deleted;
};

const UserServices = {
	registerUser,
	toggleUserStatus,
	getUser,
	getUsers,
	updateUser,
	deleteUser
};

export default UserServices;
