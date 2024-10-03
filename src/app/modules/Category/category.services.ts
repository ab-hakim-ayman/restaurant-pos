import { TCategory } from './category.interfaces';
import { Category } from './category.model';

const createCategory = async (category: TCategory) => {
	const newCategory = await Category.create(category);
	return newCategory;
};

const toggleCategoryStatus = async (id: string) => {
	const category = await Category.isCategoryExists(id);
	const status = category?.status === 'active' ? 'blocked' : 'active';

	const updatedCategory = await Category.findByIdAndUpdate(id, { status }, { new: true });
	return updatedCategory;
};

const getCategory = async (id: string) => {
	const category = await Category.isCategoryExists(id);

	return category;
};

const getCategories = async () => {
	const categories = await Category.find();

	return categories;
};

const updateCategory = async (id: string, category: TCategory) => {
	// separate the password from the category object. We don't want to update the password here.
	// eslint-disable-next-line no-unused-vars, @typescript-eslint/no-unused-vars
	const updated = await Category.findByIdAndUpdate(id, category, { new: true });

	return updated;
};

const deleteCategory = async (id: string) => {
	const deleted = await Category.findByIdAndUpdate(id, { isDeleted: true }, { new: true });

	return deleted;
};

const CategoryServices = {
	createCategory,
	toggleCategoryStatus,
	getCategory,
	getCategories,
	updateCategory,
	deleteCategory
};

export default CategoryServices;
