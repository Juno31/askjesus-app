const copyClipboard = function (navigator, url) {
  navigator.clipboard.writeText(url);
};

export default copyClipboard;
