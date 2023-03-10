import React, { useEffect, useRef } from "react";

function AppearText({ children }) {
  const ref = useRef();

  useEffect(function () {
    setTimeout(function () {
      ref.current.classList.add("opacity-100");
    }, 500);
  }, []);

  return (
    <p
      ref={ref}
      className="flex min-w-full flex-row items-center justify-center py-4 text-sm font-medium text-white opacity-0 md:text-base"
    >
      {children}
    </p>
  );
}

export default AppearText;
