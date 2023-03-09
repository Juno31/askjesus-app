import { useEffect } from "react";

//component
import BubbleWrapper from "./bubble-wrapper";
import UserBubble from "./user-bubble";

//utils
import scrollToBottom from "@/utils/scrollToBottom";

const UserMessage = function ({ type, content }) {
  useEffect(function () {
    scrollToBottom();
  }, []);

  return (
    <div className="my-2 flex min-w-full max-w-full flex-row gap-2">
      <div className=" w-12"></div>
      <BubbleWrapper type={type}>
        <UserBubble>{content}</UserBubble>
      </BubbleWrapper>
    </div>
  );
};

export default UserMessage;
