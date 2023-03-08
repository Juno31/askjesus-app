const replaceVariable = function (text, key, value) {
  const token = `{${key}}`;

  return text.replaceAll(token, value);
};

export default replaceVariable;
