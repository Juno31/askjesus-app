import { useState, useEffect } from "react";
import Image from "next/image";
import React from "react";

//api
import api from "@/apis";
import ReactGA from "react-ga4";

function Profile({ appear, closeProfile }) {
  const numberFilter = new Intl.NumberFormat("en-US");
  const [follow, setFollow] = useState(0);
  const [isFollow, setIsFollow] = useState(false);

  const handleFollowClick = async function () {
    try {
      ReactGA.event("follow");
      await api.addFollow("3124ecce-06cf-4953-bd7a-12d940df1ff2");

      setFollow((current) => current + 1);
      setIsFollow(true);
      window.localStorage.setItem("follow_jesus", true);
    } catch (error) {}
  };

  const getJesusFollow = async function () {
    try {
      const response = await api.getFollow(
        "3124ecce-06cf-4953-bd7a-12d940df1ff2"
      );

      const follow = response.followerCount;
      setFollow(follow);
    } catch (error) {}
  };

  useEffect(function () {
    setIsFollow(window.localStorage.getItem("follow_jesus") === "true");
    getJesusFollow();
  }, []);

  return (
    <div
      className={`fixed top-0 left-0 flex min-h-screen w-full items-center justify-center bg-black bg-opacity-60 px-4 transition-all duration-300 ${
        appear ? "z-10 opacity-100" : "z-0 opacity-0"
      }`}
    >
      <div className="popup flex flex-col items-center justify-start rounded-3xl bg-white p-6 pb-14">
        <div className="flex min-w-full justify-end">
          <Image
            src={"/icons/close-icon.svg"}
            width={24}
            height={24}
            onClick={closeProfile}
            className={"cursor-pointer"}
            alt={"close-icon"}
          />
        </div>
        <Image
          src={"/icons/jesus-icon.svg"}
          width={100}
          height={100}
          className="mt-3"
          alt={"jesus-icon"}
        />
        <div className="mt-3 flex flex-row items-center gap-1">
          <h1 className="text-kaya-black text-xl font-bold">Jesus</h1>
          <Image
            src={"/icons/authentic-icon.svg"}
            width={14}
            height={14}
            className={"pb-1"}
            alt={"authentic-icon"}
          />
        </div>
        <p className="text-kaya-black text-base">
          {numberFilter.format(follow)} Followers
        </p>
        <p className="text-kaya-black mt-2 text-center">
          {"I'm not as old as you think."} <br />
          #edm_lover
        </p>
        <button
          className="bg-kaya-500 disabled:text-kaya-black disabled:bg-kaya-gray mt-4 rounded-xl px-9 py-2 font-bold text-white"
          onClick={handleFollowClick}
          disabled={isFollow}
        >
          {isFollow ? "Followed" : "Follow"}
        </button>
      </div>
    </div>
  );
}

export default Profile;
