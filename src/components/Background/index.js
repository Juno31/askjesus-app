import { useEffect } from "react";

const Background = function () {
  useEffect(function () {
    let vh = window.innerHeight * 0.01;
    document.documentElement.style.setProperty("--bg", `${vh}px`);

    // window.addEventListener("resize", function () {
    //   let vh = window.innerHeight * 0.01;
    //   document.documentElement.style.setProperty("--bg", `${vh}px`);
    // });
  }, []);
  return <div className="bg-url max-h-view min-w-full object-contain" />;
};

export default Background;
