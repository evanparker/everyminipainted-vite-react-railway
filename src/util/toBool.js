const toBool = (value) => {
  console.log("value: ", value, !!value);

  if (value === undefined) {
    return false;
  } else if (typeof value === "string" && value.toLowerCase() === "false") {
    return false;
  } else {
    return !!value;
  }
};
export default toBool;
