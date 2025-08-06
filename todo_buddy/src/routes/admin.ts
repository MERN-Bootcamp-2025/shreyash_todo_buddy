import { Router } from 'express';
import { AdminController } from '../controllers/admin.controller';
import { authentification } from "../middlewares/auth.middleware";
import { authorization } from "../middlewares/authorization";


const router = Router();

router.post('/invite', authentification, authorization(["admin"]), AdminController.invitUser);
// router.get('/users', authenticateJWT, isAdmin, getAllUsers);
router.post('/login', AdminController.login);
router.get('/users', authentification, authorization(["admin"]), AdminController.getAllUsers);


export { router as adminRouter };
