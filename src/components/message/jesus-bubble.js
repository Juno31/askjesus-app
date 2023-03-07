import React from "react";

function JesusMessage({ children }) {
  return (
    <div className="fade-up-target animate bg-kaya-500 rounded-bl-3xl rounded-tr-3xl rounded-br-3xl px-4 py-3 font-light text-white">
      {children}
    </div>
  );
}

export default JesusMessage;
