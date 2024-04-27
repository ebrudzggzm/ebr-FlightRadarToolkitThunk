const checkValid = (value) => {
  return value === 0 || value === null || value === undefined || value === ""
    ? "Bilinmiyor"
    : value;
};

export default checkValid;
