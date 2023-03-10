const getTextLoadingTime = function (text) {
  if (!text.length) return 0;

  return text.length * (1000 / 15);
};

export default getTextLoadingTime;
