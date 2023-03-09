const scrollToBottom = function () {
  if (document && window) {
    const currentHeight = document.documentElement.scrollHeight; // document height

    if (window.innerHeight < currentHeight) {
      window.scrollTo({ top: currentHeight, behavior: "smooth" });
    }
  }
};

export default scrollToBottom;
