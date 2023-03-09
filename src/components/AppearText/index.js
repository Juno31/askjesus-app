import React, { useEffect, useRef } from "react";

function AppearText({ children }) {
  const ref = useRef();

  useEffect(function () {
    setTimeout(function () {
      ref.current.classList.add("appear-animate");
    }, 50);
  }, []);

  return (
    <p
      ref={ref}
      className="appear-target flex min-w-full flex-row items-center justify-center py-4 text-sm font-medium text-white md:text-base"
    >
      {children}
    </p>
  );
}

export default AppearText;
