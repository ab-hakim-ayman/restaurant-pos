import bcrypt from 'bcrypt';
import httpStatus from 'http-status';
import { Schema, model } from 'mongoose';
import AppError from '../../errors/AppError';
import { TUser, UserModel } from './user.interfaces';

const userSchema = new Schema<TUser, UserModel>(
	{
		restaurant_name: {
			type: String,
			required: [true, 'Restaurant name is required!']
		},
		owner_name: {
			type: String,
			required: [true, 'Owner name is required!']
		},
		email: {
			type: String,
			required: [true, 'Email is required!'],
			unique: true
		},
		password: {
			type: String,
			required: [true, 'Password is required!'],
			select: false
		},
		role: {
			type: String,
			default: 'user'
		},
		status: {
			type: String,
			enum: ['active', 'blocked'],
			default: 'active'
		}
	},
	{
		timestamps: true
	}
);

//! pre save middleware/hook || hashing password
userSchema.pre('save', async function (next) {
	// eslint-disable-next-line @typescript-eslint/no-this-alias
	const user = this;
	if (user.isModified('password')) {
		user.password = await bcrypt.hash(user.password, 10);
	}
	next();
});

userSchema.statics.isUserExists = async function (id: string) {
	const user = await this.findById(id).select('+password');
	if (!user) {
		throw new AppError(httpStatus.NOT_FOUND, 'User not found');
	}
	return;
};

userSchema.statics.isPasswordMatched = async function (plainPassword: string, hashedPassword: string) {
	return await bcrypt.compare(plainPassword, hashedPassword);
};

userSchema.statics.findUserByEmail = async function (email: string) {
	const user = await this.findOne({ email });
	if (!user) {
		throw new AppError(httpStatus.NOT_FOUND, 'User not found');
	}
	return user;
};

export const User = model<TUser, UserModel>('User', userSchema);
