import User from "../models/User.js"
import Project from "../models/Project.js"
import TimeEntry from "../models/TimeEntry.js"
import { error, success } from "../utils/responseWrapper.js";



const getAllProjects = async (req,res) => {
    try {
        const {
          page = 1,
          search,
          status,
          priority,
          client,
          category,
          sortBy = 'createdAt',
          sortOrder = 'desc'
        } = req.query;
    
        const safePage = Math.max(1, parseInt(page) || 1);
const limit = 5;
const skip = (safePage - 1) * limit;
    
        // Build query
        let query = {};
        if (req.user.role === 'employee') {
          query.teamMembers = req.user._id;
        }
    
        if (search) {
          query.projectName = { $regex: search, $options: 'i' }; 
        }
        if (status) {
          query.status = status;
        }
        if (priority) {
          query.priority = priority;
        }
        if (client) {
          query.client = { $regex: client, $options: 'i' };
        }
        if (category) {
          query.category = { $regex: category, $options: 'i' };
        }
    
        const sort = {};
        sort[sortBy] = sortOrder === 'asc' ? 1 : -1;
    

        const projects = await Project.find(query)
          .skip(skip)
          .limit(limit)
          .sort(sort)
          .populate('teamMembers', 'id name avatarUrl')
          .lean();
    
        // Get total count for pagination
        const totalProjects = await Project.countDocuments(query);
        const totalPages = Math.ceil(totalProjects / limit);
        const allprojects = projects.map(project => ({
            id: project._id,
            projectName: project.projectName,
            client: project.client,
            teamMembers: project.teamMembers,
            status: project.status,
            priority: project.priority,
            color: project.color,
            estimatedHours: project.estimatedHours,
            hoursLogged: project.hoursLogged,
            progressPercent: project.progressPercent,
            startDate: project.startDate,
            dueDate: project.dueDate
          }))

          return res.send(success(200, {
            allprojects,
            totalProjects,
            totalPages,
            currentPage: parseInt(page)
          }));
    } catch (err) {
        console.log(err);
         return res.send(error(500,"Something went wrong"))
      }
}

const createProject = async (req,res) => {
    try {
        const {
          projectName,
          client,
          teamMembers,
          status,
          priority,
          color,
          estimatedHours,
          description,
          category,
          startDate,
          dueDate,
          endDate
        } = req.body;
    
        if (!projectName || !client) {
        return res.send(error(400,"projectName and client are required"))
        }
    
        if (teamMembers && teamMembers.length > 0) {
          const users = await User.find({ _id: { $in: teamMembers } });
          if (users.length !== teamMembers.length) {
            return res.send(error(400,"One or more team members not found"))
          }
        }
    
        const project = new Project({
          projectName,
          client,
          teamMembers: teamMembers || [],
          status: status || 'Planning',
          priority: priority || 'Medium',
          color,
          estimatedHours: estimatedHours || 0,
          hoursLogged: 0,
          description,
          category,
          startDate: startDate ? new Date(startDate) : undefined,
          dueDate: dueDate ? new Date(dueDate) : undefined,
          endDate: endDate ? new Date(endDate) : undefined,
          progressPercent: 0
        });
    
        await project.save();
    
        return res.send(success(201,{
            id: project._id,
            projectName: project.projectName,
            client: project.client,
            status: project.status
        }))
      } catch (err) {
        console.log(err);
        return res.send(error(500,"Something went wrong"))
      }
}

const updateProject = async (req, res) => {
    try {
      const { id } = req.params;
      const { projectName, client, teamMembers } = req.body;
  
      if (!projectName || !client) {
        return res.send(error(400,"projectName and client are required"))
      }
  
      if (teamMembers?.length > 0) {
        const users = await User.find({ _id: { $in: teamMembers } });
        if (users.length !== teamMembers.length) {
          return res.send(error(400,"One or more team members not found"))
        }
      }
  
      const project = await Project.findById(id);
      if (!project) {
        return res.send(error(400,"Project not found"))
      }
  
      const allowedFields = [
        'projectName',
        'client',
        'teamMembers',
        'status',
        'priority',
        'color',
        'estimatedHours',
        'description',
        'category',
        'startDate',
        'dueDate',
        'progressPercent'
      ];
  
      for (const field of allowedFields) {
        if (field in req.body) {
          project[field] = ['startDate', 'dueDate'].includes(field)
            ? new Date(req.body[field])
            : req.body[field];
        }
      }
  
      await project.save();
  
     return res.send(success(200,{id: project._id,
        projectName: project.projectName,
        client: project.client,
        status: project.status}))
  
    } catch (err) {
      console.error(err);
      return res.status(500).json({ message: "Something went wrong" });
    }
  };

  const updateProjectStatus = async (req,res) => {
    try {
        const { id } = req.params;
        const { status } = req.body;
    
        const project = await Project.findById(id);
        if (!project) {
          return res.status(404).json({ message: 'Project not found' });
        }
    
        if (status) {
          project.status = status;
        } else {
         return res.send(error(400,"Project not found"));
        }
    
        await project.save();
    
        res.status(200).json({
          id: project._id,
          projectName: project.projectName,
          status: project.status,
          progressPercent: project.progressPercent
        });
      } catch (error) {
        next(error);
      }
  }

  const addTeamMemberToProject = async (req,res) => {
    try {
        const  {id} = req.params;
        const {userId} = req.body;
        
        const project = await Project.findById(id);
        if (!project) {
        return res.send(error(404,"Project not found"))
        }

        const user = await User.findById(userId);
        if (!user) {
        return res.send(error(400,"User not found"))
        }
        if (!project.teamMembers.includes(userId)) {
            project.teamMembers.push(userId);
            await project.save();
          }
      
        return res.send(success(200,{
            id: project._id,
            projectName: project.projectName,
            teamMembers: project.teamMembers.map(member => member.toString())
        }))
    } catch (err) {
        return res.send(error(500,"Something went wrong"));
    }
  }

  const removeTeamMemberToProject = async (req,res) => {
    try {
        const { id, userId } = req.params;
    
        const project = await Project.findById(id);
        if (!project) {
        return res.send(error(404,"Project not found"))
        }
    
        const user = await User.findById(userId);
        if (!user) {
        return res.send(error(400,"User not found"))
        }
    
        project.teamMembers = project.teamMembers.filter(member => member.toString() !== userId);
        await project.save();
    
        return res.send(success(200,"Team member removed successfully"))
      } catch (err) {
       console.log(err);
       return res.send(error(500,"Something went wrong"));
      }
  }

  const deleteProject = async (req,res) => {
    try {
        const {id} = req.params;
        const project = await Project.findByIdAndDelete(id);
        if (!project) {
        return res.send(error(404,"Project not found"));
        }
    
        return res.send(success(200,"Project deleted successfully"))
        
    } catch (err) {
        console.log(err);
        return res.send(error(500,"Something Went Wrong"))
    }
  }

  const getProjectOfTeamMember = async (req, res) => {
    try {
      const projects = await Project.find({
        teamMembers: req.user._id,
      }).lean();
  
      return res.send(success(200, projects));
    } catch (err) {
      console.error(err);
      return res.send(error(500, "Something went wrong"));
    }
  };
export {getProjectOfTeamMember,createProject,updateProject,removeTeamMemberToProject,addTeamMemberToProject,deleteProject,getAllProjects,updateProjectStatus}