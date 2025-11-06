export const isAboveSixMonths = (startDate?: string | Date): boolean => {
  if (!startDate) return false;

  const start = new Date(startDate);
  const now = new Date();

  // Calculate the difference in milliseconds
  const diffInMs = now.getTime() - start.getTime();

  // Convert to days
  const diffInDays = diffInMs / (1000 * 60 * 60 * 24);

  // 6 months ≈ 183 days (accounting for 30.5 days/month average)
  return diffInDays >= 183;
};

export const formatStartDate = (dateValue: any) => {
  if (!dateValue) return "";
  const date = new Date(dateValue);
  if (isNaN(date.getTime())) return ""; // invalid date fallback -> return empty

  const year = date.getFullYear(); // ✅ always a number
  const month = date.toLocaleString("en-US", { month: "short" });
  return `${month} ${year}`;
};
