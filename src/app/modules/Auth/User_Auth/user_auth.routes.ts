import express from 'express';
import validateRequest from '../../../middlewares/validateRequest';
import AuthValidations from '../auth.validations';
import UserAuthControllers from './user_auth.controllers';

const router = express.Router();

router.post('/login', validateRequest(AuthValidations.loginValidation), UserAuthControllers.loginUser);

const UserAuthRoutes = router;

export default UserAuthRoutes;
