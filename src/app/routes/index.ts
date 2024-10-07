import express from "express";
import AddonRoutes from "../modules/Addon/addon.routes";
import UserAuthRoutes from "../modules/Auth/User_Auth/user_auth.routes";
import CategoryRoutes from "../modules/Category/category.routes";
import UserRoutes from "../modules/User/user.routes";
import ProductRoutes from "../modules/Product/product.routes";
import CustomerRoutes from "../modules/Customer/customer.routes";

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
  {
    path: "/products",
    route: ProductRoutes,
  },
  {
    path: "/customers",
    route: CustomerRoutes,
  },
];

moduleRoutes.forEach((route) => router.use(route.path, route.route));

export default router;
