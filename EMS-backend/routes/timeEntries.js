import express from "express"
import { getCurrentTime, getSingleUserTimeEntries, getTimeEntryUser, startTimer, stopTimer, timeEntryStats } from "../controllers/timeEntriesController.js";
import { verifyToken } from "../middlewares/auth.js";

const router = express.Router();

router.get("/get-time",getCurrentTime);
router.post("/start",verifyToken,startTimer);
router.patch("/stop/:id",verifyToken,stopTimer);
router.get("/",verifyToken,getTimeEntryUser);
router.get("/stats",verifyToken,timeEntryStats);
router.get("/all",verifyToken,getSingleUserTimeEntries);

export default router;