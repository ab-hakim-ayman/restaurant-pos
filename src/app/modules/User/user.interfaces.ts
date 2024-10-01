/* eslint-disable no-unused-vars */
import { Model } from 'mongoose';

export interface TUser {
	_id?: string;
	restaurant_name: string;
	owner_name: string;
	email: string;
	password: string;
	status?: 'active' | 'blocked';
	role: 'user';
	isDeleted: boolean;
}

export interface UserModel extends Model<TUser> {
	isUserExists(id: string): Promise<TUser | null>;
	isPasswordMatched(plainPassword: string, hashedPassword: string): Promise<boolean>;
	findUserByEmail(email: string): Promise<TUser | null>;
}
