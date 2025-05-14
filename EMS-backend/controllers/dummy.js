const updateProject =  async (req,res) => {
    try {
        const { id } = req.params;
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
          progressPercent
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
    
        const project = await Project.findById(id);
        if (!project) {
        return res.send(error(404,"Project not found"))
        }
    
        // Update fields
        project.projectName = projectName;
        project.client = client;
        project.teamMembers = teamMembers || project.teamMembers;
        project.status = status || project.status;
        project.priority = priority || project.priority;
        project.color = color || project.color;
        project.estimatedHours = estimatedHours !== undefined ? estimatedHours : project.estimatedHours;
        project.description = description || project.description;
        project.category = category || project.category;
        project.startDate = startDate ? new Date(startDate) : project.startDate;
        project.dueDate = dueDate ? new Date(dueDate) : project.dueDate;
        project.progressPercent = progressPercent !== undefined ? progressPercent : project.progressPercent;
    
        await project.save();
    
        return res.send(200,{
            id: project._id,
          projectName: project.projectName,
          client: project.client,
          status: project.status
        })
      } catch (err) {
        console.log(err);
        return res.send(error(500,"Something went wrong"));
      }
}