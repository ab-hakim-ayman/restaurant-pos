import express from "express";
import AuthGuard from "../../middlewares/AuthGuard";
import validateRequest from "../../middlewares/validateRequest";
import AddonControllers from "./addon.controllers";
import AddonValidations from "./addon.validations";

const router = express.Router();

router.post(
  "/create",
  AuthGuard(),
  validateRequest(AddonValidations.createAddonValidation),
  AddonControllers.createAddon,
);

router.get("/", AuthGuard(), AddonControllers.getAddons);

router.put(
  "/:id",
  AuthGuard(),
  validateRequest(AddonValidations.updateAddonValidation),
  AddonControllers.updateAddon,
);

router.delete("/:id", AuthGuard(), AddonControllers.deleteAddon);

const AddonRoutes = router;

export default AddonRoutes;
