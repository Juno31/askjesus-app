import React from "react";

//constants
import { MESSAGE_TYPE } from "@/constants/service";

function BubbleWrapper({ children, type }) {
  return (
    <div
      className={`flex flex-1 flex-col ${
        type === MESSAGE_TYPE.JESUS ? "items-start" : "items-end"
      } ${type === MESSAGE_TYPE.JESUS ? "pr-14" : "pl-14"} gap-2`}
    >
      {children}
    </div>
  );
}

export default BubbleWrapper;
