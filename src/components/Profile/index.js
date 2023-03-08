import { useState, useEffect } from "react";
import Image from "next/image";
import React from "react";

function Profile({ appear, closeProfile }) {
  return (
    <div
      className={`fixed top-0 left-0 flex min-h-screen w-full items-center justify-center bg-black bg-opacity-60 px-4 transition-all duration-300 ${
        appear ? "z-10 opacity-100" : "z-0 opacity-0"
      }`}
    >
      <div className="popup flex flex-col items-center justify-start rounded-3xl bg-white p-6">
        <div className="flex min-w-full justify-end">
          <Image
            src={"/icons/close-icon.svg"}
            width={24}
            height={24}
            onClick={closeProfile}
            className={"cursor-pointer"}
          />
        </div>
        <Image
          src={"/icons/jesus-icon.svg"}
          width={100}
          height={100}
          className="mt-6"
        />
        <h1 className="text-kaya-black mt-3 text-xl font-bold">Jesus</h1>
        <p className="text-kaya-black mt-2 text-center">
          I'm not as old as you think <br />
          #edm_lover
        </p>
      </div>
    </div>
  );
}

export default Profile;
