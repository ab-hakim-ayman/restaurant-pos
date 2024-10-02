import express from 'express';
import validateRequest from '../../middlewares/validateRequest';
import UserControllers from './user.controllers';
import UserValidations from './user.validations';

const router = express.Router();

router.post('/register', validateRequest(UserValidations.registerUserValidation), UserControllers.registerUser);

router.get('/', UserControllers.getUsers);

router.get('/:id', UserControllers.getUser);

router.put('/:id', validateRequest(UserValidations.updateUserValidation), UserControllers.updateUser);

router.delete('/:id', UserControllers.deleteUser);

router.put('/toggle-status/:id', UserControllers.toggleUserStatus);

const UserRoutes = router;

export default UserRoutes;
