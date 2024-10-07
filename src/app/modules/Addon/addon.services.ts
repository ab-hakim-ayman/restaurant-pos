import httpStatus from "http-status";
import AppError from "../../errors/AppError";
import { TAddon } from "./addon.interfaces";
import { Addon } from "./addon.model";

const createAddon = async (addon: TAddon) => {
  const newAddon = await Addon.create(addon);
  return newAddon;
};

const getAddons = async (userId: string, searchQuery: string = "") => {
  const queryCondition = {
    user: userId,
    title: { $regex: searchQuery, $options: "i" },
  };

  const addons = await Addon.find(queryCondition);

  return addons;
};

const updateAddon = async (userId: string, ctgId: string, addon: TAddon) => {
  const updatedAddon = await Addon.findOneAndUpdate(
    { _id: ctgId, user: userId },
    addon,
    { new: true, runValidators: true },
  );

  if (!updatedAddon) {
    throw new AppError(
      httpStatus.NOT_FOUND,
      "Addon not found or user unauthorized to update this addon.",
    );
  }

  return updatedAddon;
};

const deleteAddon = async (userId: string, ctgId: string) => {
  const deletedAddon = await Addon.findOneAndDelete({
    _id: ctgId,
    user: userId,
  });

  if (!deletedAddon) {
    throw new AppError(
      httpStatus.NOT_FOUND,
      "Addon not found or user unauthorized to delete this addon.",
    );
  }

  return deletedAddon;
};

const AddonServices = {
  createAddon,
  getAddons,
  updateAddon,
  deleteAddon,
};

export default AddonServices;
