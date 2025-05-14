const formatDate = (date) => {
  const isoString = new Date(date).toISOString(); // Ensure it's in ISO format
  const [fullDate, fullTime] = isoString.split("T");
  const time = fullTime.split(".")[0]; // Remove milliseconds
  return { date: fullDate, time };
};

export default formatDate;