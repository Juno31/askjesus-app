import React, { useState, useEffect } from "react";
import Link from "next/link";

//components
import BubbleContainer from "@/components/Message/bubble-container";
import BubbleWrapper from "@/components/Message/bubble-wrapper";
import JesusBubble from "@/components/Message/jesus-bubble";
import UserBubble from "@/components/Message/user-bubble";
import Jesus from "@/components/Message/jesus-profile-image";

//constants
import { MESSAGE_TYPE } from "@/constants/service";
import Background from "@/components/Background";

//utils
import copyClipboard from "@/utils/copyClipboard";

function Home() {
  return (
    <>
      <Background />
      <div className="container m-auto flex justify-center">
        <div className="max-w-kaya z-10 flex max-h-max w-full flex-col items-center">
          <h1 className="mt-14 text-center text-4xl font-bold leading-normal text-white md:mt-44">
            <span className=" md:text-6xl">Ask Jesus</span>{" "}
            <br className="hidden md:block" />
            <br className="md:hidden" />
            <span className=" md:opacity-60">for Guidance</span>
            <br className="md:hidden" />
            <span className=" md:opacity-60"> of Your Life</span>
          </h1>
          {/* <h1 className=" mt-10 text-center text-2xl font-light text-white opacity-80">
          AI Jesus Chatbot
        </h1> */}
          <div className="z flex w-full min-w-full justify-center">
            <section className=" mx-6 mt-16 flex w-full max-w-full flex-col gap-2 rounded-3xl bg-white py-6 px-4 md:mx-0 md:px-6">
              <div className="md:px-4">
                <BubbleContainer>
                  <Jesus />
                  <BubbleWrapper type={MESSAGE_TYPE.JESUS}>
                    <span className="text-kaya-black text-sm font-bold">
                      Jesus
                    </span>
                    <JesusBubble>{"Hi, I'm Jesus AI."}</JesusBubble>
                    <JesusBubble>Ask me anything</JesusBubble>
                  </BubbleWrapper>
                </BubbleContainer>
                <div className=" mt-2"></div>
                <BubbleContainer>
                  <BubbleWrapper>
                    <UserBubble>Type message...</UserBubble>
                  </BubbleWrapper>
                </BubbleContainer>
              </div>
              <Link
                href={"/jesus"}
                className="bg-kaya-500 mt-4 rounded-2xl px-16 py-4 text-center font-bold text-white"
              >
                Start chat with Jesus
              </Link>
            </section>
          </div>
          <p className="mt-16 text-white">or give your friend a chance</p>
          <button
            className="mx-6 mt-2 rounded-2xl border-2 py-4 px-7 text-base font-bold text-white md:min-w-full"
            onClick={function () {
              copyClipboard(navigator, process.env.FRONT_HOST);
            }}
          >
            Share to Your Faithful Friend
          </button>
          <p className="mt-56 mb-14 text-xs text-white">
            Holisters 2023 kim@creator.ly
          </p>
        </div>
      </div>
    </>
  );
}

export default Home;
