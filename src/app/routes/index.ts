import express from "express";
import UserAuthRoutes from "../modules/Auth/User_Auth/user_auth.routes";
import UserRoutes from "../modules/User/user.routes";
import CategoryRoutes from "../modules/Category/category.routes";
import AddonRoutes from "../modules/Addon/addon.routes";

const router = express.Router();

const moduleRoutes = [
  {
    path: "/users",
    route: UserRoutes,
  },
  {
    path: "/auth",
    route: UserAuthRoutes,
  },
  {
    path: "/categories",
    route: CategoryRoutes,
  },
  {
    path: "/addons",
    route: AddonRoutes,
  },
];

moduleRoutes.forEach((route) => router.use(route.path, route.route));

export default router;
