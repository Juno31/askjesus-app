import React, { useRef, useEffect } from "react";

function UserBubble({ children }) {
  const ref = useRef();

  useEffect(function () {
    const element = ref.current;

    setTimeout(function () {
      element.classList.add("animate");
    }, 50);
  }, []);

  return (
    <div
      ref={ref}
      className="fade-up-target bg-kaya-gray max-w-full rounded-tl-3xl rounded-tr-3xl rounded-bl-3xl px-4 py-3 text-sm font-normal text-black transition-all duration-300 ease-linear md:text-base"
    >
      {children}
    </div>
  );
}

export default UserBubble;
