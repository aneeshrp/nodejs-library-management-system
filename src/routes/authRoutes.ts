import { Router, Request, Response } from "express";
import { authenticateUser, registerUser } from "../controllers/auth.controller";



const router = Router();

router.post('/register',registerUser);
router.post('/login', authenticateUser)

export default router;