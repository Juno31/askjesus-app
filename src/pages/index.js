import React from "react";
import Image from "next/image";
import Link from "next/link";

//components
import MessageContainer from "@/components/message/container";
import MessageWrapper from "@/components/message/message-wrapper";
import SystemBubble from "@/components/message/system";
import MinBubble from "@/components/message/mine";
import Jesus from "@/components/message/jesus";

//assets

const MESSAGE_TYPE = {
  SYSTEM: "jesus",
  USER: "user",
};

function Home() {
  return (
    <div className="container m-auto flex h-max justify-center">
      <div className=" flex w-full max-w-lg flex-col items-center bg-gradient-to-b from-purple-200 to-white pb-10">
        <h1 className=" mt-20 text-center text-4xl font-bold text-purple-900">
          Connect with <br />
          Jesus <br />
          AI Jesus Chatbot
        </h1>
        <div className="flex min-w-full max-w-full justify-center">
          <section className="mx-3 mt-16 flex w-full max-w-full flex-col gap-2 rounded-3xl bg-white p-6">
            <MessageContainer>
              <Jesus />
              <MessageWrapper type={MESSAGE_TYPE.SYSTEM}>
                <span className="text-sm font-bold text-black">Jesus</span>
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
              className="mt-8 rounded-3xl bg-purple-600 px-16 py-4 text-center font-bold text-white"
            >
              Start chat with Jesus
            </Link>
          </section>
        </div>
        <p className="mt-5 font-light text-purple-600">
          Give a friend a chance
        </p>
        <Link
          href={"/jesus"}
          className=" mt-2 rounded-3xl border-2 border-purple-600 bg-transparent px-16 py-4 text-center font-bold text-purple-600"
        >
          Start chat with Jesus
        </Link>
        <p className=" mt-20 min-w-full px-4 text-xs font-light text-purple-900">
          Awake Corporation @2023
          <br />
          Seoul, South Korea
          <br />
          kim@creator.ly
        </p>
      </div>
    </div>
  );
}

export default Home;
