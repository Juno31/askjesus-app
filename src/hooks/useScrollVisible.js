import { useEffect, useLayoutEffect, useState } from "react";

const DIRECTION_TYPE = {
  UP: true,
  DOWN: false,
};

function useScrollVisible() {
  const [scrollHeight, setScrollHeight] = useState(0);
  const [scrollDirection, setScrollDirection] = useState(DIRECTION_TYPE.UP);

  useEffect(function () {
    const detectScroll = function () {
      const currentScrollY = window.scrollY;

      if (scrollHeight < currentScrollY && currentScrollY > 200) {
        setScrollHeight(currentScrollY);
        setScrollDirection(DIRECTION_TYPE.DOWN);
      } else if (scrollHeight > currentScrollY) {
        setScrollHeight(currentScrollY);
        setScrollDirection(DIRECTION_TYPE.UP);
      }

      return;
    };

    window.addEventListener("scroll", detectScroll);

    return function () {
      window.removeEventListener("scroll", detectScroll);
    };
  }, []);

  return { scrollHeight, scrollDirection };
}

export default useScrollVisible;
