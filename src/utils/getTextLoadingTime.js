const getTextLoadingTime = function (text) {
  if (!text.length) return 0;

  return text.length * 50;
};

export default getTextLoadingTime;
