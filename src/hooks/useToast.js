import { useCallback, useMemo, useState } from "react";

//Components
import Toast from "@/components/Toast";

function useToast() {
  /* model */
  const [toast, setToast] = useState(null); // 컨텐츠
  const [timer, setTimer] = useState(null); // 타이머

  const handleToast = useCallback(
    function (desc) {
      if (!timer) {
        setToast(desc);
        setTimer(
          setTimeout(function () {
            setToast(null);
          }, 3500)
        );
      } else {
        /* 이전 작업 초기화 */
        setToast(null);
        clearTimeout(timer);
        setTimer(null);

        setTimeout(function () {
          setToast(desc);
          setTimer(
            setTimeout(function () {
              setToast(null);
            }, 3500)
          );
        }, 1);
      }
    },
    [toast, setToast, timer]
  );

  const component = useMemo(
    function () {
      // view
      return (
        <>
          toast && <Toast toast={toast} />
        </>
      );
    },
    [toast]
  );

  return { handleToast, component };
}

export default useToast;
