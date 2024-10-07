import express from "express";
import AuthGuard from "../../middlewares/AuthGuard";
import validateRequest from "../../middlewares/validateRequest";
import CustomerControllers from "./customer.controllers";
import CustomerValidations from "./customer.validations";

const router = express.Router();

router.post(
  "/create",
  AuthGuard("user"),
  validateRequest(CustomerValidations.createCustomerValidation),
  CustomerControllers.createCustomer,
);

router.get("/", AuthGuard("user"), CustomerControllers.getCustomers);

router.put(
  "/:id",
  AuthGuard("user"),
  validateRequest(CustomerValidations.updateCustomerValidation),
  CustomerControllers.updateCustomer,
);

router.delete("/:id", AuthGuard("user"), CustomerControllers.deleteCustomer);

const CustomerRoutes = router;

export default CustomerRoutes;
