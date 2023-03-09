import { useLayoutEffect, useState, useEffect } from "react";

//Components
import Jesus from "./jesus-profile-image";
import BubbleWrapper from "./bubble-wrapper";
import JesusBubble from "@/components/Message/jesus-bubble";
import { BeatLoader } from "react-spinners";

//utils
import scrollToBottom from "@/utils/scrollToBottom";

const JesusMessage = function ({ type, isStart, time, content, openProfile }) {
  const [visible, setVisble] = useState(false);

  useLayoutEffect(function () {
    if (time) {
      setTimeout(function () {
        setVisble(true);
      }, time);
    } else {
      setVisble(true);
    }
  }, []);

  useEffect(
    function () {
      if (visible && window.location.pathname !== "/") {
        scrollToBottom();
      }
    },
    [visible]
  );

  return (
    <div className="flex min-w-full max-w-full flex-row gap-2">
      {isStart ? (
        <Jesus onClick={openProfile} />
      ) : (
        <div className=" w-12"></div>
      )}
      <BubbleWrapper type={type}>
        {isStart && <span className="text-sm font-bold text-white">Jesus</span>}
        <JesusBubble>
          {visible ? (
            content
          ) : (
            <BeatLoader
              color={"#f1c5f7"}
              size={"8px"}
              speedMultiplier={"0.5"}
            />
          )}
        </JesusBubble>
      </BubbleWrapper>
    </div>
  );
};

export default JesusMessage;
