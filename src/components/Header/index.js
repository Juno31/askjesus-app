import { useState } from "react";
import useScrollVisible from "@/hooks/useScrollVisible";
import Image from "next/image";

import React from "react";

function Header({ handleArrowClick, handleShareClick }) {
  // const { scrollHeight, scrollDirection } = useScrollVisible();

  return (
    <header
      className={`max-w-kaya z-5 header-visible fixed top-0 flex h-16 w-full flex-row justify-between bg-white bg-opacity-0 px-4 py-4`}
    >
      <Image
        src={"/icons/arrow-left-icon.svg"}
        width={24}
        height={24}
        className="mr-6 cursor-pointer active:scale-95"
        onClick={handleArrowClick}
        alt={"back arrow"}
        priority={true}
      />
      <div className="text-xl font-bold text-white">Jesus</div>
      <div
        className="text-kaya-500 cursor-pointer text-xl font-semibold"
        onClick={handleShareClick}
      >
        Share
      </div>
    </header>
  );
}

export default Header;
