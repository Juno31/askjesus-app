import React from "react";

function BubbleContainer({ children }) {
  return (
    <div className="flex min-w-full max-w-full flex-row gap-3 py-1">
      {children}
    </div>
  );
}

export default BubbleContainer;
