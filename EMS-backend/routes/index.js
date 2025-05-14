import express from "express"
import authRouter from "./auth.js"
import adminRouter from "./admin.js"
import dashboardRouter from "./dashboard.js"
import  projectRouter from "./project.js"
import timeEntryRouter from "./timeEntries.js"

const router = express.Router();

router.use("/auth",authRouter)
router.use("/admin",adminRouter);
router.use("/dashboard",dashboardRouter);
router.use("/projects",projectRouter);
router.use("/time-entries",timeEntryRouter);

export default router