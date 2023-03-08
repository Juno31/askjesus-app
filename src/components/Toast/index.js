import React from "react";
import Image from "next/image";

function Toast({ toast }) {
  return (
    <div className="toast flex flex-row items-center gap-2 rounded-lg p-4 font-normal text-white">
      <Image src={"/icons/check-icon.svg"} width={24} height={24} />
      <p className="">{toast}</p>
    </div>
  );
}

export default Toast;
