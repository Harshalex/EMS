import express from "express"
import { addTeamMemberToProject, createProject, deleteProject, getAllProjects, getProjectOfTeamMember, removeTeamMemberToProject, updateProject, updateProjectStatus } from "../controllers/projectController.js";
import { requireAdmin, verifyToken } from "../middlewares/auth.js";

const router = express.Router();

router.get("/",verifyToken,getAllProjects)
router.post("/",verifyToken, requireAdmin,createProject)
router.put("/:id",verifyToken, requireAdmin,updateProject);
router.put("/status/:id",verifyToken,requireAdmin,updateProjectStatus);
router.delete("/:id",verifyToken, requireAdmin,deleteProject);
router.post("/team-members/:id",verifyToken, requireAdmin,addTeamMemberToProject)
router.delete("/team-members/:id/:userId",verifyToken, requireAdmin,removeTeamMemberToProject);
router.get("/team-member",verifyToken,getProjectOfTeamMember);

export default router;