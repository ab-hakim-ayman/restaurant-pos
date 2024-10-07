import httpStatus from "http-status";
import { Types } from "mongoose";
import AppError from "../../errors/AppError";
import { TProduct } from "./product.interfaces";
import { Product } from "./product.model";

interface UpdateProductOptions {
  variants?: Array<{ _id: string; title: string; price: number }>;
  addons?: Array<Types.ObjectId>;
  removeVariants?: string[];
  removeAddons?: string[];
}

const createProduct = async (
  userId: string,
  productData: Partial<TProduct>,
) => {
  const product = new Product({
    ...productData,
    user: userId,
  });

  await product.save();
  return product;
};

const updateProduct = async (
  userId: string,
  productId: string,
  updateData: Partial<TProduct>,
  modification: UpdateProductOptions,
) => {
  const product = await Product.findOne({ _id: productId, user: userId });
  if (!product) {
    throw new AppError(httpStatus.NOT_FOUND, "Product not found!");
  }

  const variantsToAdd = modification.variants ?? [];
  const addonsToAdd = modification.addons ?? [];
  const variantsToRemove = modification.removeVariants ?? [];
  const addonsToRemove = modification.removeAddons ?? [];

  const notifications: string[] = [];

  const existingVariantIds = product.variants?.map((variant) => variant._id);
  const newVariants = variantsToAdd.filter(
    (newVariant) => !existingVariantIds?.includes(newVariant._id),
  );
  const alreadyExistingVariants = variantsToAdd.filter(
    (newVariant) => existingVariantIds?.includes(newVariant._id),
  );

  if (alreadyExistingVariants.length > 0) {
    notifications.push(
      `These variants already exist and were not added: ${alreadyExistingVariants
        .map((v) => v._id)
        .join(", ")}`,
    );
  }
  if (newVariants.length > 0) {
    product.variants = [...(product.variants ?? []), ...newVariants];
  }

  const existingVariantsToRemove = (product.variants ?? []).filter((variant) =>
    variantsToRemove.includes(variant._id),
  );
  const nonExistingVariantsToRemove = variantsToRemove.filter(
    (variantId) =>
      !(product.variants ?? []).some((variant) => variant._id === variantId),
  );

  if ((nonExistingVariantsToRemove ?? []).length > 0) {
    notifications.push(
      `These variants do not exist and were not removed: ${nonExistingVariantsToRemove.join(
        ", ",
      )}`,
    );
  }

  if ((existingVariantsToRemove ?? []).length > 0) {
    product.variants = (product.variants ?? []).filter(
      (variant) => !variantsToRemove.includes(variant._id),
    );
  }

  const existingAddonIds = product.addons?.map((addon) => addon.toString());
  const newAddons = addonsToAdd.filter(
    (newAddon) => !existingAddonIds?.includes(newAddon.toString()),
  );
  const alreadyExistingAddons = addonsToAdd.filter(
    (newAddon) => existingAddonIds?.includes(newAddon.toString()),
  );

  if (alreadyExistingAddons.length > 0) {
    notifications.push(
      `These addons already exist and were not added: ${alreadyExistingAddons
        .map((a) => a.toString())
        .join(", ")}`,
    );
  }
  if (newAddons.length > 0) {
    product.addons = [...(product.addons ?? []), ...newAddons];
  }

  const existingAddonsToRemove = (product.addons ?? []).filter((addon) =>
    addonsToRemove.includes(addon.toString()),
  );
  const nonExistingAddonsToRemove = addonsToRemove.filter(
    (addonId) =>
      !(product.addons ?? []).some((addon) => addon.toString() === addonId),
  );

  if ((nonExistingAddonsToRemove ?? []).length > 0) {
    notifications.push(
      `These addons do not exist and were not removed: ${nonExistingAddonsToRemove.join(
        ", ",
      )}`,
    );
  }

  if ((existingAddonsToRemove ?? []).length > 0) {
    product.addons = (product.addons ?? []).filter(
      (addon) => !addonsToRemove.includes(addon.toString()),
    );
  }

  Object.assign(product, updateData);

  await product.save();

  return {
    product,
    notifications,
  };
};

const getProducts = async (userId: string, searchQuery: string = "") => {
  const queryCondition = { user: userId };

  if (searchQuery.trim()) {
    const products = await Product.find(queryCondition)
      .populate({
        path: "category",
        match: { title: { $regex: new RegExp(searchQuery.trim(), "i") } },
      })
      .populate("addons");

    return products.filter((product) => product.category);
  }

  const products = await Product.find(queryCondition)
    .populate("addons")
    .populate("category");
  return products;
};

const deleteProduct = async (userId: string, productId: string) => {
  const deletedProduct = await Product.findOneAndDelete({
    _id: productId,
    user: userId,
  });

  if (!deletedProduct) {
    throw new AppError(
      httpStatus.NOT_FOUND,
      "Product not found or not authorized!",
    );
  }

  return deletedProduct;
};

export const ProductServices = {
  createProduct,
  updateProduct,
  getProducts,
  deleteProduct,
};
