export const handleError = (error) => {
  console.error("Operation failed");
  if (error) console.error(error.message);
};
