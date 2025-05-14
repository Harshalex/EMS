export const getWeekStart = (date = new Date()) => {
    const day = date.getDay(); // 0 (Sunday) to 6 (Saturday)
    const diff = (day === 0 ? 6 : day - 1); // Calculate days to subtract to get to Monday
    const weekStart = new Date(date);
    weekStart.setDate(date.getDate() - diff);
    weekStart.setHours(0, 0, 0, 0); // Set to start of the day
    return weekStart.toISOString().split('T')[0]; // Return as YYYY-MM-DD
  };