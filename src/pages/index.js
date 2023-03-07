import React from "react";
import Image from "next/image";
import Link from "next/link";

//components
import MessageContainer from "@/components/message/container";
import MessageWrapper from "@/components/message/message-wrapper";
import SystemBubble from "@/components/message/jesus-bubble";
import MinBubble from "@/components/message/user-bubble";
import Jesus from "@/components/message/jesus";

//assets

const MESSAGE_TYPE = {
  SYSTEM: "jesus",
  USER: "user",
};

function Home() {
  return (
    <div className="container m-auto flex h-max justify-center">
      <div className="bg-url fixed  min-w-full" />
      <div className="max-w-kaya z-10 flex w-full flex-col items-center pb-10">
        <h1 className=" mt-14 text-center text-4xl font-bold text-white md:mt-40">
          Ask Jesus <br className="md:hidden" /> for Guidance
          <br className="md:hidden" /> of your Life
        </h1>
        <h1 className=" mt-10 text-center text-2xl font-bold text-white">
          AI Jesus Chatot
        </h1>
        <div className="z flex w-full min-w-full justify-center">
          <section className="mx-3 mt-16 flex w-full max-w-full flex-col gap-2 rounded-3xl bg-white py-6 px-6 md:px-10">
            <MessageContainer>
              <Jesus />
              <MessageWrapper type={MESSAGE_TYPE.SYSTEM}>
                <span className="text-kaya-black text-sm font-bold">Jesus</span>
                <SystemBubble>{"Hi, I'm Jesus AI."}</SystemBubble>
                <SystemBubble>Ask me anything</SystemBubble>
              </MessageWrapper>
            </MessageContainer>
            <MessageContainer>
              <MessageWrapper>
                <MinBubble>Type message...</MinBubble>
              </MessageWrapper>
            </MessageContainer>
            <Link
              href={"/jesus"}
              className="bg-kaya-500 mt-8 rounded-3xl px-16 py-4 text-center font-bold text-white"
            >
              Start chat with Jesus
            </Link>
          </section>
        </div>
      </div>
    </div>
  );
}

export default Home;
