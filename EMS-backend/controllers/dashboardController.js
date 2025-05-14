import User from "../models/User.js";
import TimeEntry from "../models/TimeEntry.js";
import Project from "../models/Project.js";

const getDashboardData = async (req, res) => {
  try {
    // 1. Total Employees
    const totalEmployees = await User.countDocuments({ role: 'employee' });
    const startOfMonth = new Date(new Date().getFullYear(), new Date().getMonth(), 1);
    const newEmployeesThisMonth = await User.countDocuments({
      role: 'employee',
      createdAt: { $gte: startOfMonth },
    });

    // 2. Hours Logged (Month)
    const startOfCurrentMonth = new Date(new Date().getFullYear(), new Date().getMonth(), 1);
    const startOfLastMonth = new Date(new Date().getFullYear(), new Date().getMonth() - 1, 1);
    const endOfLastMonth = new Date(new Date().getFullYear(), new Date().getMonth(), 0);

    const currentMonthHours = await TimeEntry.aggregate([
      { $match: { date: { $gte: startOfCurrentMonth } } },
      { $group: { _id: null, totalHours: { $sum: '$hours' } } },
    ]);
    const lastMonthHours = await TimeEntry.aggregate([
      { $match: { date: { $gte: startOfLastMonth, $lte: endOfLastMonth } } },
      { $group: { _id: null, totalHours: { $sum: '$hours' } } },
    ]);

    const hoursLogged = currentMonthHours[0]?.totalHours || 0;
    const lastMonthHoursLogged = lastMonthHours[0]?.totalHours || 0;
    const hoursChangePercent = lastMonthHoursLogged
      ? ((hoursLogged - lastMonthHoursLogged) / lastMonthHoursLogged) * 100
      : 0;

    // 3. Active Projects
    const activeProjects = await Project.countDocuments({ status: 'Active' });
    const currentDate = new Date();
    const projectsBehindSchedule = await Project.countDocuments({
      status: 'Behind Schedule',
    });
    const highPriorityProjects = await Project.countDocuments({
      status: 'Active',
      priority: 'High',
    });
    const delayedProjects = await Project.countDocuments({
      status: { $in: ['Active', 'Planning', 'On Hold'] }, 
      dueDate: { $lt: currentDate },
    });

    // 4. Weekly Hours Tracked (Last 2 Weeks)
    const twoWeeksAgo = new Date();
    twoWeeksAgo.setDate(currentDate.getDate() - 14);
    const weeklyHours = await TimeEntry.aggregate([
      { $match: { date: { $gte: twoWeeksAgo, $lte: currentDate } } },
      {
        $group: {
          _id: {
            $dateToString: { format: '%Y-%m-%d', date: '$date' },
          },
          totalHours: { $sum: '$hours' },
        },
      },
      { $sort: { _id: 1 } },
    ]);

    // 5. Hours by Project Category
    const hoursByProject = await TimeEntry.aggregate([
      { $match: { date: { $gte: startOfCurrentMonth } } },
      {
        $lookup: {
          from: 'projects',
          localField: 'project',
          foreignField: '_id',
          as: 'project',
        },
      },
      { $unwind: '$project' },
      {
        $group: {
          _id: '$project.category',
          totalHours: { $sum: '$hours' },
        },
      },
    ]);

    const totalHoursByProject = hoursByProject.reduce((sum, entry) => sum + (entry.totalHours || 0), 0);
    const hoursByProjectPercent = hoursByProject.map((entry) => ({
      category: entry._id || 'Uncategorized',
      percentage: totalHoursByProject ? (entry.totalHours / totalHoursByProject) * 100 : 0,
    }));

    // 6. Total Members by Department (Assuming department represents roles like UI, UX, API)
    const membersByDepartment = await User.aggregate([
      { $match: { role: 'employee' } },
      { $group: { _id: '$department', count: { $sum: 1 } } },
      { $match: { _id: { $ne: null } } }, // Exclude users with no department
    ]);

    // Combine all data into the response
    const dashboardData = {
      totalEmployees,
      newEmployeesThisMonth,
      hoursLogged,
      hoursChangePercent: parseFloat(hoursChangePercent.toFixed(2)),
      activeProjects,
      projectsBehindSchedule,
      highPriorityProjects,
      delayedProjects,
      weeklyHours: weeklyHours.map((entry) => ({
        date: entry._id,
        hours: entry.totalHours,
      })),
      hoursByProject: hoursByProjectPercent,
      membersByDepartment: membersByDepartment.map((entry) => ({
        department: entry._id,
        count: entry.count,
      })),
    };

    res.status(200).json(dashboardData);
  } catch (error) {
    console.error('Error fetching dashboard data:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

export {getDashboardData}