export const isAboveSixMonths = (startDate?: string | Date): boolean => {
  if (!startDate) return false;
  const start = new Date(startDate);
  const now = new Date();
  const diffInMonths =
    (now.getFullYear() - start.getFullYear()) * 12 +
    (now.getMonth() - start.getMonth());
  return diffInMonths >= 6;
};