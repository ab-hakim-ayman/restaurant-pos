import httpStatus from "http-status";
import AppError from "../../errors/AppError";
import { TCategory } from "./category.interfaces";
import { Category } from "./category.model";

const createCategory = async (category: TCategory) => {
  const newCategory = await Category.create(category);
  return newCategory;
};

const getCategories = async (userId: string, searchQuery: string = "") => {
  const queryCondition = {
    user: userId,
    title: { $regex: searchQuery, $options: "i" },
  };

  const categories = await Category.find(queryCondition);

  return categories;
};

const updateCategory = async (
  userId: string,
  ctgId: string,
  category: TCategory,
) => {
  const updatedCategory = await Category.findOneAndUpdate(
    { _id: ctgId, user: userId },
    category,
    { new: true, runValidators: true },
  );

  if (!updatedCategory) {
    throw new AppError(
      httpStatus.NOT_FOUND,
      "Category not found!",
    );
  }

  return updatedCategory;
};

const deleteCategory = async (userId: string, ctgId: string) => {
  const deletedCategory = await Category.findOneAndDelete({
    _id: ctgId,
    user: userId,
  });

  if (!deletedCategory) {
    throw new AppError(
      httpStatus.NOT_FOUND,
      "Category not found!",
    );
  }

  return deletedCategory;
};

const CategoryServices = {
  createCategory,
  getCategories,
  updateCategory,
  deleteCategory,
};

export default CategoryServices;
