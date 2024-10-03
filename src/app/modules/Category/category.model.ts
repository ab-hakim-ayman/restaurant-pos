import bcrypt from 'bcrypt';
import httpStatus from 'http-status';
import { Schema, model } from 'mongoose';
import AppError from '../../errors/AppError';
import { TCategory, CategoryModel } from './category.interfaces';

const categorySchema = new Schema<TCategory, CategoryModel>(
	{
		category_name: {
			type: String,
			required: [true, 'Restaurant name is required!']
		},
		status: {
			type: String,
			enum: ['active', 'blocked'],
			default: 'active'
		},
		isDeleted: {
			type: Boolean,
			default: false
		}
	},
	{
		timestamps: true
	}
);

categorySchema.statics.isCategoryExists = async function (id: string) {
	const category = await this.findById(id).select('+category_name');
	if (!category) {
		throw new AppError(httpStatus.NOT_FOUND, 'Category not found!');
	}
	return category;
};

categorySchema.statics.findCategoryByName = async function (category_name: string) {
	const category = await this.findOne({ category_name });
	if (!category) {
		throw new AppError(httpStatus.NOT_FOUND, 'Category not found!');
	}
	return category;
};

export const Category = model<TCategory, CategoryModel>('Category', categorySchema);
