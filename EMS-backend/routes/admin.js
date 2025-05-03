import express from "express";
import { createEmployee, deleteEmployee, getAllEmployee, getEmployeeById, updateEmployee } from "../controllers/adminController.js";
import { verifyToken,requireAdmin } from "../middlewares/auth.js";


const router = express.Router();

router.get("/getall-emp",verifyToken, requireAdmin,getAllEmployee);
router.post("/create",verifyToken, requireAdmin,createEmployee);
router.delete("/delete/:id",verifyToken, requireAdmin,deleteEmployee);
router.put("/update/:id",updateEmployee);
router.get("/get-emp/:id",getEmployeeById);

export default router