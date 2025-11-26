export const formatReadableTimestamp = function (timestamp) {
  const date = new Date(timestamp);

  const day = String(date.getDate()).padStart(2, "0");

  const monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun",
                      "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
  const month = monthNames[date.getMonth()];

  const year = date.getFullYear();

  // Time formatting in 12-hour format
  let hours = date.getHours();
  const minutes = String(date.getMinutes()).padStart(2, "0");
  const ampm = hours >= 12 ? "PM" : "AM";

  hours = hours % 12;
  hours = hours ? hours : 12; // 0 → 12

  const hoursStr = String(hours).padStart(2, "0");

  return `${day}-${month}-${year} ${hoursStr}:${minutes} ${ampm}`;
};
