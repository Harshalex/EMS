import TimeEntry from "../models/TimeEntry.js";
import Project  from "../models/Project.js"
import {success,error} from "../utils/responseWrapper.js"
import formatDate from "../utils/dateFormat.js";
import ntpClient from "ntp-client";
import cron from "node-cron";

const updateProjectHours = async (projectId) => {
  const timeEntries = await TimeEntry.find({ project: projectId, status: "Completed" });
  const totalHours = timeEntries.reduce((sum, entry) => sum + entry.duration, 0);
  const project = await Project.findById(projectId);
  if (project) {
    project.hoursLogged = totalHours;
    await project.save(); 
  }
};

function getGoogleTimeInIST() {
  return new Promise((resolve, reject) => {
    ntpClient.getNetworkTime("time.google.com", 123, (err, date) => {
      if (err) {
        return reject("Error getting NTP time: " + err);
      }
      const istOffset = 5.5 * 60 * 60 * 1000;
      const istDate = new Date(date.getTime() + istOffset);
      resolve(istDate);
    });
  });
}

cron.schedule("0 0 * * *", async () => {
  try {
    console.log("Running cron job to stop stale timers...");
    const now = new Date();
    const oneDayAgo = new Date(now.getTime() - 24 * 60 * 60 * 1000);

    const staleEntries = await TimeEntry.find({
      status: "Running",
      startTime: { $lt: oneDayAgo },
    });

    for (const entry of staleEntries) {
      entry.endTime = now;
      entry.status = "Completed";
      await entry.save();
      await updateProjectHours(entry.project);
      console.log(`Stopped stale timer for time entry ${entry._id}`);
    }
  } catch (error) {
    console.error("Error in cron job:", error);
  }
});

const getCurrentTime = async (req,res) => {
   try {
    const now = await getGoogleTimeInIST();
    return res.send(success(200,formatDate(now)));
   } catch (err) {
    console.log(err);
    return res.send(error(500,"Something went wrong"));
   }
}

const startTimer = async (req,res) => {
    try {
        const { project, description, activityType } = req.body;
    
        if (!project) {
          return res.status(400).json({ message: "project is required" });
        }
    
        const existingTimer = await TimeEntry.findOne({
          user: req.user._id,
          status: "Running",
        });
        if (existingTimer) {
          return res.status(400).json({
            message: "You already have a running timer. Stop it before starting a new one.",
            runningTimerId: existingTimer._id,
          });
        }
        const now = await getGoogleTimeInIST();
        console.log("This is the currecnt  time")
        console.log(formatDate(now));
        const timeEntry = new TimeEntry({
          user: req.user._id,
          project,
          date: now,
          startTime: now,
          endTime: null,
          description,
          entryMode: "Timer",
          activityType: activityType || "Other",
          status: "Running",
          duration: 0,
        });
    
        await timeEntry.save();
    
        return res.send(success(200,{ id: timeEntry._id,
          project: timeEntry.project,
          date: formatDate(timeEntry.date),
          startTime: formatDate(timeEntry.startTime),
          endTime: formatDate(timeEntry.endTime),
          duration: timeEntry.duration,
          status: timeEntry.status,}))
       } 
      
      catch (err) {
        console.log(err);
        return res.send(error(50,"Something went wrong"));
      }
}

const stopTimer = async (req,res) => {
  try {
    const {id} = req.params;
    const timeEntry = await TimeEntry.findById(id);
    if (!timeEntry) {
      return res.send(error(404,"Time entry not found"))
    }

    if (timeEntry.status === "Completed") {
      return res.send(error(400,"Timer is already stopped"))
    }

    timeEntry.endTime = await getGoogleTimeInIST();
    timeEntry.status = "Completed";
    await timeEntry.save();

    await updateProjectHours(timeEntry.project);
 
    return res.send(success(200,{
      id: timeEntry._id,
      project: timeEntry.project,
      date: formatDate(timeEntry.date),
      startTime: formatDate(timeEntry.startTime),
      endTime: formatDate(timeEntry.endTime),
      duration: timeEntry.duration,
      status: timeEntry.status,
    }))
  } catch (err) {
    console.log(err);
    return res.send(error(500,"Something went wrong"));
  }
}

// We can fire a  query like  this  also if we want a particular  project time entries  or based on the week
// http://192.168.1.43:5000/time-entries?weekStart=2025-05-12&project=6821cae709c25d04d7201f18
const getTimeEntryUser = async (req,res) => {
    try {
      const { weekStart, project ,status} = req.query;
  
      let query = {};
      if (req.user.role === "employee") {
        query.user = req.user._id;
      }
  
      if (project) {
        query.project = project;
      }
  
      if (weekStart) {
        const startDate = new Date(weekStart);
        const endDate = new Date(startDate);
        endDate.setDate(startDate.getDate() + 7);
        query.date = { $gte: startDate, $lt: endDate };
      }
      const timeEntries = await TimeEntry.find(query)
      .populate("project", "id projectName color")
      .sort({ date: -1 })
      .lean();

      if (status) {
        query.status = status; 
      }
    const totalHours = timeEntries
      .filter((entry) => entry.status === "Completed")
      .reduce((sum, entry) => sum + entry.duration, 0);
    
    const entries = timeEntries.map((entry) => ({
      id: entry._id,
      project: entry.project,
      date: formatDate(entry.date),
      startTime: formatDate(entry.startTime),
      endTime: formatDate(entry.endTime),
      duration: entry.duration,
      description: entry.description,
      entryMode: entry.entryMode,
      status: entry.status,
    }))
      
    return res.send(success(200,{
      entries,
      totalHours
    }))
  } catch (err) {
    console.log(err);
    return res.send(error(500,"Something Went wrong"));
  }
}

const getSingleUserTimeEntries = async (req, res) => {
  try {
    const query = { user: req.user._id }; 

    const timeEntries = await TimeEntry.find(query)
      .populate("project", "id projectName color")
      .sort({ date: -1 })
      .lean();

    const totalHours = timeEntries
      .filter((entry) => entry.status === "Completed")
      .reduce((sum, entry) => sum + entry.duration, 0);

    const entries = timeEntries.map((entry) => ({
      id: entry._id,
      project: entry.project,
      date: formatDate(entry.date),
      startTime: formatDate(entry.startTime),
      endTime: entry.endTime ? formatDate(entry.endTime) : null,
      duration: entry.duration,
      description: entry.description,
      entryMode: entry.entryMode,
      status: entry.status,
    }));

    return res.send(
      success(200, {
        entries,
        totalHours,
      })
    );
  } catch (err) {
    console.error(err);
    return res.send(error(500, "Something went wrong"));
  }
};

const timeEntryStats = async (req,res) => {
  try {
    if (req.user.role !== "employee") {
      return res.status(403).json({ message: "Access denied: Employees only" });
    }

    const { weekStart } = req.query;

    let query = { user: req.user._id, status: "Completed" };

    if (weekStart) {
      const startDate = new Date(weekStart);
      const endDate = new Date(startDate);
      endDate.setDate(startDate.getDate() + 7);
      query.date = { $gte: startDate, $lt: endDate };
    }

    const timeEntries = await TimeEntry.find(query).lean();

    const stats = timeEntries.reduce(
      (acc, entry) => {
        acc.weeklyActivity += entry.duration;
        if (entry.activityType === "Productive") {
          acc.productiveTime += entry.duration;
        } else if (entry.activityType === "Research") {
          acc.researchActivity += entry.duration;
        }
        return acc;
      },
      { weeklyActivity: 0, productiveTime: 0, researchActivity: 0 }
    );

    return res.send(success(200,stats));
  } catch (err) {
    console.log(err);
    return res.send(error(500,"Something went worng"));
  }
}

export {startTimer,stopTimer,getTimeEntryUser,timeEntryStats,getCurrentTime,getSingleUserTimeEntries}