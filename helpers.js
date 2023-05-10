const isImageType = (str) => {
  const regex = /^image\/(jpe?g|png|gif|svg\+xml)$/;
  return regex.test(str);
};

module.exports = {
  isImageType,
};
