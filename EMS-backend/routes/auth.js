import express from "express"
import {  logincontroller, registerAdmin } from "../controllers/authController.js";

const router = express.Router();

router.post("/login",logincontroller);
router.post("/register/admin",registerAdmin);

export default router;