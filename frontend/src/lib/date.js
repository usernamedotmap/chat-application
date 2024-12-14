export const fixingDateAndTime = (date) => {
  return new Date(date).toLocaleDateString("en-US", {
    hour: "2-digit",
    minute: "2-digit",
    hour12: false,
  });
};
