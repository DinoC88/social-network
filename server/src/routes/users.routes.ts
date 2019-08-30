import { Router } from 'express';
import { testUserRoute, registerUser, loginUser, deleteUser } from '../controllers/users.controller';
import { checkJwt } from '../config/checkJwt';
const router = Router();

router.route('/').get(testUserRoute);

router.route('/register').post(registerUser);

router.route('/login').post(loginUser);

router.route('/').delete(checkJwt, deleteUser);

export default router;
