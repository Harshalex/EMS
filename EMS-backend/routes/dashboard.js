import { getDashboardData } from "../controllers/dashboardController.js";
import express from "express"

const router = express.Router();

router.get("/",getDashboardData);

export default router;
