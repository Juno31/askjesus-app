import React, {
  useCallback,
  useEffect,
  useLayoutEffect,
  useState,
} from "react";
import { useRouter } from "next/router";

//components
import MessageWrapper from "@/components/message/message-wrapper";
import JesusBubble from "@/components/message/system";
import UserBubble from "@/components/message/mine";
import Jesus from "@/components/message/jesus";
import Image from "next/image";

//utils
import random from "@/utils/random";

//api
import api from "@/apis";

const MESSAGE_TYPE = {
  JESUS: "jesus",
  USER: "user",
};

const GREETINGS = ["Hello", "Hi", "Good Morning"];

const INPUT_DEFAULT = {
  spellCheck: false,
  autoComplete: false,
};

const PRAYER_TYPE = {
  ACCEPT: "ACCEPT",
  DECLINE: "DECLINE",
};

const READY_TYPE = {
  READY: "READY",
  NOT_READY: "NOT_READY",
};

const SATISFACTION_TYPE = {
  POSITIVE: "POSITIVE",
  NEUTRAL: "NEUTRAL",
  NEGATIVE: "NEGATIVE",
};

const COMPLETION_EXP =
  "Hello my beloved child, I am always with you and I know the troubles you face. You don't need me to prove who I am, for my love for you is evident and true. Trust in me and believe in my words, for my teachings will guide you towards the path of righteousness and peace. May my love and blessingsbe with you always.";

function Home() {
  const router = useRouter();
  const [step, setStep] = useState(0);
  const [name, setName] = useState("");
  const [agenda, setAgenda] = useState("");
  const [prayerType, setPrayerType] = useState();
  const [readyType, setReadyType] = useState(false);
  const [ssatisfactionType, setSatisfactionType] = useState();
  const [completions, setCompletions] = useState("");
  const [feedback, setFeedback] = useState("");
  const [retry, setRetry] = useState();
  const [chats, setChats] = useState([]);
  const [isInput, setIsInput] = useState(false);
  const [isSelect, setIsSelect] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [end, setEnd] = useState(false);

  const reset = function () {
    setStep(0);
    setName("");
    setAgenda("");
    setPrayerType(null);
    setReadyType(null);
    setSatisfactionType(null);
    setCompletions("");
    setIsInput(false);
    setIsSelect(false);
    setIsLoading(false);
  };

  const initialize = async function () {
    try {
      const response = await api.healthCheck();

      if (response) {
        setStep(1);
      }
    } catch (error) {
      triggerMessage.error();
    }
  };

  const addChat = function (chat) {
    setChats((current) => [...current, chat]);
  };

  const triggerMessage = {
    error: function () {
      addChat({
        type: MESSAGE_TYPE.JESUS,
        isStart: true,
        time: 1000,
        content: `I sometimes want to be alone.`,
      });

      setTimeout(function () {
        addChat({
          type: MESSAGE_TYPE.JESUS,
          isStart: false,
          time: 1000,
          content: "Please come back later.",
        });
      }, 1000);
    },
    askName: function () {
      const randomGreetings = random(GREETINGS);

      addChat({
        type: MESSAGE_TYPE.JESUS,
        isStart: true,
        time: 1000,
        content: `${randomGreetings}, I'm Jesus`,
      });

      setTimeout(function () {
        addChat({
          type: MESSAGE_TYPE.JESUS,
          isStart: false,
          time: 1000,
          content: "I was listening to Blackpink's new album. It's stunning.",
        });
      }, 1000);

      setTimeout(function () {
        addChat({
          type: MESSAGE_TYPE.JESUS,
          isStart: false,
          time: 1000,
          content: "What's your name?",
        });

        setTimeout(function () {
          setIsInput(true);
        }, 1000);
      }, 2000);
    },
    askAgenda: function () {
      addChat({
        type: MESSAGE_TYPE.USER,
        isStart: false,
        time: 0,
        content: name,
      });

      setTimeout(function () {
        addChat({
          type: MESSAGE_TYPE.JESUS,
          isStart: true,
          time: 1000,
          content: `Good to see you, ${name}.`,
        });
      }, 1000);

      setTimeout(function () {
        addChat({
          type: MESSAGE_TYPE.JESUS,
          isStart: false,
          time: 1000,
          content: `Tell me what you've got`,
        });
      }, 2000);

      setTimeout(function () {
        addChat({
          type: MESSAGE_TYPE.JESUS,
          isStart: false,
          time: 1000,
          content: `Maybe I can help you.`,
        });
      }, 3000);

      setTimeout(function () {
        setIsInput(true);
      }, 4000);
    },
    askPrayer: function () {
      addChat({
        type: MESSAGE_TYPE.USER,
        isStart: false,
        time: 0,
        content: agenda,
      });

      setTimeout(function () {
        addChat({
          type: MESSAGE_TYPE.JESUS,
          isStart: true,
          time: 1000,
          content: "Got it.",
        });
      }, 1000);

      setTimeout(function () {
        addChat({
          type: MESSAGE_TYPE.JESUS,
          isStart: false,
          time: 1000,
          content: "Hmm.... Let me think.",
        });
      }, 2000);

      setTimeout(function () {
        addChat({
          type: MESSAGE_TYPE.JESUS,
          isStart: false,
          time: 1000,
          content: "It might help a lot if you pray for me.",
        });
      }, 3000);

      setTimeout(function () {
        setStep(3);
        setIsSelect(true);
      }, 4000);
    },
    acceptPrayer: function () {
      addChat({
        type: MESSAGE_TYPE.USER,
        isStart: false,
        time: 0,
        content: "🙏 Amen",
      });

      setTimeout(function () {
        addChat({
          type: MESSAGE_TYPE.JESUS,
          isStart: true,
          time: 1000,
          content: "How nice of you. ",
        });
      }, 1000);

      setTimeout(function () {
        setStep(5);
      }, 2000);
    },
    declinePrayer: function () {
      addChat({
        type: MESSAGE_TYPE.USER,
        isStart: false,
        time: 0,
        content: "I don't want to",
      });

      setTimeout(function () {
        addChat({
          type: MESSAGE_TYPE.JESUS,
          isStart: true,
          time: 1000,
          content: "It's okay. ",
        });
      }, 1000);

      setTimeout(function () {
        setStep(5);
      }, 2500);
    },
    askReady: function () {
      addChat({
        type: MESSAGE_TYPE.JESUS,
        isStart: false,
        time: 0,
        content: "I'm done thinking about what you told me.",
      });
      addChat({
        type: MESSAGE_TYPE.JESUS,
        isStart: false,
        time: 1000,
        content: "There's something I want to tell you.",
      });

      setTimeout(function () {
        addChat({
          type: MESSAGE_TYPE.JESUS,
          isStart: false,
          time: 1000,
          content: `Are you ready to hear, ${name}?`,
        });
      }, 1000);

      setTimeout(function () {
        setIsSelect(true);
      }, 2000);
    },
    answerWord: function () {
      setChats((current) => [
        ...current,
        {
          type: MESSAGE_TYPE.USER,
          isStart: false,
          time: 0,
          content: "🤗 Yes",
        },
      ]);

      completions.forEach(function (completion, index, array) {
        if (!completion) return;

        setTimeout(function () {
          setChats((current) => [
            ...current,
            {
              type: MESSAGE_TYPE.JESUS,
              isStart: index === 0,
              time: 1000,
              content: completion,
            },
          ]);
        }, index * 1000);
      });

      setTimeout(function () {
        setIsSelect(true);
      }, completions.length * 1000);
    },
    notReady: function () {
      addChat({
        type: MESSAGE_TYPE.USER,
        isStart: true,
        time: 0,
        content: "Not really",
      });

      setTimeout(function () {
        addChat({
          type: MESSAGE_TYPE.JESUS,
          isStart: true,
          time: 1000,
          content: "I'm sorry to hear that.",
        });

        setTimeout(function () {
          setEnd(true);
        }, 1500);
      }, 1000);
    },
    satisfactionPositive: function () {
      addChat({
        type: MESSAGE_TYPE.USER,
        isStart: false,
        time: 0,
        content: `😘 Good`,
      });

      setTimeout(function () {
        addChat({
          type: MESSAGE_TYPE.JESUS,
          isStart: true,
          time: 1000,
          content: `My pleasure, ${name}.`,
        });
      }, 0);

      setTimeout(function () {
        addChat({
          type: MESSAGE_TYPE.JESUS,
          isStart: false,
          time: 1000,
          content: `Can you tell me specifically what you were thinking?`,
        });

        setTimeout(function () {
          setIsInput(true);
        }, 1000);
      }, 1000);
    },
    satisfactionNeutral: function () {
      addChat({
        type: MESSAGE_TYPE.USER,
        isStart: false,
        time: 0,
        content: `Well....`,
      });

      setTimeout(function () {
        addChat({
          type: MESSAGE_TYPE.JESUS,
          isStart: true,
          time: 1000,
          content: `Hm... Why did you think so?`,
        });
      }, 0);

      setTimeout(function () {
        setIsInput(true);
      }, 1000);
    },
    satisfactionNegative: function () {
      addChat({
        type: MESSAGE_TYPE.USER,
        isStart: false,
        time: 0,
        content: `I don't like this answer.`,
      });

      setTimeout(function () {
        addChat({
          type: MESSAGE_TYPE.JESUS,
          isStart: true,
          time: 1000,
          content: `${name}, I'm sorry to hear that.`,
        });
      }, 0);

      setTimeout(function () {
        addChat({
          type: MESSAGE_TYPE.JESUS,
          isStart: true,
          time: 1000,
          content: `If you tell me in detail, I'll be sure to refer to it next time.`,
        });

        setTimeout(function () {
          setIsInput(true);
        }, 1000);
      }, 1000);
    },
    feedbackLong: function () {
      addChat({
        type: MESSAGE_TYPE.USER,
        isStart: false,
        time: 0,
        content: feedback,
      });

      addChat({
        type: MESSAGE_TYPE.JESUS,
        isStart: true,
        time: 1000,
        content: "Thank you for expressing your feelings honestly.",
      });

      setTimeout(function () {
        addChat({
          type: MESSAGE_TYPE.JESUS,
          isStart: false,
          time: 1000,
          content:
            "I want you to share this experience with your friend. I bet you have some friends who need me.",
        });

        setTimeout(function () {
          setStep(10);
        }, 1000);
      }, 1000);
    },
    feedbackShort: function () {
      addChat({
        type: MESSAGE_TYPE.USER,
        isStart: false,
        time: 0,
        content: feedback,
      });

      addChat({
        type: MESSAGE_TYPE.JESUS,
        isStart: true,
        time: 1000,
        content: "I understand the words in your heart",
      });

      setTimeout(function () {
        setStep(10);
      }, 1000);
    },
    askRetry: function () {
      setChats((current) => [
        ...current,
        {
          type: MESSAGE_TYPE.JESUS,
          isStart: false,
          time: 1000,
          content: "Do you have more thing to talk about?",
        },
      ]);

      setTimeout(function () {
        setIsSelect(true);
      }, 1000);
    },
    endAction: function () {},
  };

  const handleArrowClick = function () {
    router.push("/");
  };

  const checkEnter = function (e) {
    return e.key === "Enter";
  };

  const handleNameSubmit = function () {
    if (name?.length) {
      setIsInput(false);
      setStep(2);
    }
  };

  const handleAgendaSubmit = function () {
    setIsInput(false);
    getChatGpt();
    setStep(3);
  };

  const handleRetryAgendaSubmit = function () {
    setIsInput(false);
    getChatGpt();
    setStep(3);
  };

  const handleAmenSubmit = function (type) {
    setIsSelect(false);
    setPrayerType(type);
    setStep(4);
  };

  const handleSatisfactionSubmit = function (type) {
    setIsSelect(false);
    setSatisfactionType(type);
    setStep(8);
  };

  const handleFeedbackSubmit = function () {
    setIsInput(false);
    setStep(9);
  };

  const getChatGpt = async function () {
    setIsLoading(true);
    try {
      setTimeout(function () {
        const completion = COMPLETION_EXP.split(".");
        setCompletions(completion);
        setIsLoading(false);
      }, 10000);
    } catch (error) {
      setIsLoading(false);
      setChats((current) => [
        ...current,
        {
          type: MESSAGE_TYPE.JESUS,
          isStart: false,
          time: 0,
          content: "",
        },
      ]);
    }
  };

  const handleReadySubmit = function () {
    setIsSelect(false);
    setReadyType(READY_TYPE.READY);
    setStep(7);
  };

  const handleNotReadySubmit = function () {
    setIsSelect(false);
    setReadyType(READY_TYPE.NOT_READY);
    setStep(7);
  };

  const handleRetrySubmit = function (retry) {
    setIsSelect(false);

    if (retry) {
      setAgenda(null);
      setChats((current) => [
        ...current,
        {
          type: MESSAGE_TYPE.USER,
          isStart: false,
          time: 0,
          content: "Yes, please.",
        },
      ]);

      setTimeout(function () {
        setChats((current) => [
          ...current,
          {
            type: MESSAGE_TYPE.JESUS,
            isStart: true,
            time: 1000,
            content: "I'm a little busy, but I'll make time for you.",
          },
        ]);
      }, 1000);

      setTimeout(function () {
        setChats((current) => [
          ...current,
          {
            type: MESSAGE_TYPE.JESUS,
            isStart: false,
            time: 1000,
            content: `So what's next, ${name}?`,
          },
        ]);
      }, 2000);

      setTimeout(function () {
        setIsInput(true);
      }, 3000);
    } else {
      addChat({
        type: MESSAGE_TYPE.USER,
        time: 0,
        isStart: false,
        content: "No, I'm done",
      });

      addChat({
        type: MESSAGE_TYPE.JESUS,
        time: 1000,
        isStart: true,
        content: `It was nice meeting you, ${name}.`,
      });

      setTimeout(function () {
        addChat({
          type: MESSAGE_TYPE.JESUS,
          isStart: false,
          time: 1000,
          content: "God bless you.",
        });

        setTimeout(function () {
          setEnd(true);
        }, 1500);
      }, 1000);
    }
  };

  const stepListener = function (step) {
    if (step === 0) {
      initialize();
    } else if (step === 1) {
      triggerMessage.askName();
    } else if (step === 2) {
      triggerMessage.askAgenda();
    } else if (step === 3) {
      triggerMessage.askPrayer();
    } else if (step === 4) {
      if (prayerType === PRAYER_TYPE.ACCEPT) {
        triggerMessage.acceptPrayer();
      } else {
        triggerMessage.declinePrayer();
      }
    } else if (step === 6) {
      triggerMessage.askReady();
    } else if (step === 7) {
      if (readyType === READY_TYPE.READY) {
        triggerMessage.answerWord();
      } else {
        triggerMessage.notReady();
      }
    } else if (step === 8) {
      if (ssatisfactionType === SATISFACTION_TYPE.POSITIVE) {
        triggerMessage.satisfactionPositive();
      } else if (ssatisfactionType === SATISFACTION_TYPE.NEUTRAL) {
        triggerMessage.satisfactionNeutral();
      } else if (ssatisfactionType === SATISFACTION_TYPE.NEGATIVE) {
        triggerMessage.satisfactionNegative();
      }
    } else if (step === 9) {
      if (feedback.length < 100) {
        triggerMessage.feedbackLong();
      } else {
        triggerMessage.feedbackShort();
      }
    } else if (step === 10) {
      triggerMessage.askRetry();
    }
  };

  useLayoutEffect(
    function () {
      stepListener(step);
      console.log("useEffect");
    },
    [step]
  );

  useEffect(
    function () {
      if (step === 5 && completions) {
        setIsLoading(false);
        setStep(6);
      }
    },
    [step, completions]
  );

  return (
    <div className="container m-auto flex h-max justify-center">
      <div className=" relative flex w-full max-w-lg flex-col items-center bg-white">
        <header className="fixed top-0 z-10 flex h-16 w-full max-w-lg flex-row justify-between bg-white px-4 py-4">
          <Image
            src={"/icons/arrow-left-icon.svg"}
            width={23.35}
            height="20"
            className="cursor-pointer"
            onClick={handleArrowClick}
            alt={"back arrow"}
          />
          <div className="font-bold text-indigo-900">Jesus</div>
          <div className="cursor-pointer font-semibold text-purple-600">
            Share
          </div>
        </header>
        <div className=" flex min-w-full max-w-full justify-center px-4 pb-60 pt-20">
          <section className="flex w-full max-w-full flex-col gap-2 rounded-3xl bg-white">
            {chats.map(function (chat) {
              const type = chat.type;
              const isStart = chat.isStart;
              const time = chat.time;
              const content = chat.content;

              if (type === "jesus") {
                return (
                  <JesusMessage
                    key={chat.type + chat.time + chat.content}
                    type={type}
                    isStart={isStart}
                    time={time}
                    content={content}
                  />
                );
              }

              return (
                <UserMessage
                  key={chat.type + chat.time + chat.content}
                  type={type}
                  content={content}
                />
              );
            })}
            {isLoading && step === 5 && (
              <div className="flex min-w-full max-w-full flex-row gap-2">
                <div className=" w-12"></div>
                <MessageWrapper type={MESSAGE_TYPE.JESUS}>
                  <JesusBubble>....</JesusBubble>
                </MessageWrapper>
              </div>
            )}
            {end && (
              <p className="min-w-full py-3 text-center text-base font-normal text-black">
                Jesus left the chat.
              </p>
            )}
          </section>
        </div>
        {(isInput || isSelect) && (
          <footer className="fixed bottom-0 z-10 flex w-full max-w-lg flex-row justify-between gap-2 bg-transparent px-4 py-4">
            {isInput && step === 1 && (
              <>
                <input
                  className="h-12 flex-1 rounded-3xl bg-gray-200 px-4 py-3 placeholder:font-light"
                  placeholder="Type a message"
                  onChange={function (e) {
                    setName(e.target.value);
                  }}
                  onKeyUp={function (e) {
                    if (checkEnter(e)) {
                      handleNameSubmit();
                    }
                  }}
                  {...INPUT_DEFAULT}
                />
                <Image
                  src={"/icons/send-message-icon.svg"}
                  width={48}
                  height={48}
                  onClick={handleNameSubmit}
                  alt={"submit"}
                />
              </>
            )}
            {isInput && step === 2 && (
              <>
                <input
                  className="h-12 flex-1 rounded-3xl bg-gray-200 px-4 py-3 placeholder:font-light"
                  placeholder="Type a message"
                  onChange={function (e) {
                    setAgenda(e.target.value);
                  }}
                  onKeyUp={function (e) {
                    if (checkEnter(e)) {
                      handleAgendaSubmit();
                    }
                  }}
                  {...INPUT_DEFAULT}
                />
                <Image
                  src={"/icons/send-message-icon.svg"}
                  width={48}
                  height={48}
                  onClick={handleAgendaSubmit}
                  alt={"submit"}
                />
              </>
            )}
            {isInput && step === 8 && (
              <>
                <input
                  className="h-12 flex-1 rounded-3xl bg-gray-200 px-4 py-3 placeholder:font-light"
                  placeholder="Type a message"
                  onChange={function (e) {
                    setFeedback(e.target.value);
                  }}
                  onKeyUp={function (e) {
                    if (checkEnter(e)) {
                      handleFeedbackSubmit();
                    }
                  }}
                  {...INPUT_DEFAULT}
                />
                <Image
                  src={"/icons/send-message-icon.svg"}
                  width={48}
                  height={48}
                  onClick={handleFeedbackSubmit}
                  alt={"submit"}
                />
              </>
            )}
            {isInput && step === 10 && (
              <>
                <input
                  className="h-12 flex-1 rounded-3xl bg-gray-200 px-4 py-3 placeholder:font-light"
                  placeholder="Type a message"
                  onChange={function (e) {
                    setAgenda(e.target.value);
                  }}
                  onKeyUp={function (e) {
                    if (checkEnter(e)) {
                      handleRetryAgendaSubmit();
                    }
                  }}
                  {...INPUT_DEFAULT}
                />
                <Image
                  src={"/icons/send-message-icon.svg"}
                  width={48}
                  height={48}
                  onClick={handleRetryAgendaSubmit}
                  alt={"submit"}
                />
              </>
            )}
            {isSelect && step === 3 && (
              <div className="flex w-full max-w-full flex-row justify-center gap-3">
                <SelectItem
                  onClick={function () {
                    handleAmenSubmit(PRAYER_TYPE.ACCEPT);
                  }}
                >
                  🙏 Amen
                </SelectItem>
                <SelectItem
                  onClick={function () {
                    handleAmenSubmit(PRAYER_TYPE.DECLINE);
                  }}
                >
                  {"I don't want to"}
                </SelectItem>
              </div>
            )}
            {isSelect && step === 6 && (
              <div className="flex w-full max-w-full flex-row justify-center gap-3">
                <SelectItem onClick={handleReadySubmit}>🤗 Yes</SelectItem>
                <SelectItem onClick={handleNotReadySubmit}>
                  Not really
                </SelectItem>
              </div>
            )}
            {isSelect && step === 0 && (
              <div className="flex w-full max-w-full flex-row justify-center gap-3">
                <SelectItem onClick={initialize}>I changed my mind</SelectItem>
              </div>
            )}
            {isSelect && step === 7 && (
              <div className="flex w-full max-w-full flex-row justify-center gap-3">
                <SelectItem
                  onClick={function () {
                    handleSatisfactionSubmit(SATISFACTION_TYPE.POSITIVE);
                  }}
                >
                  😘 Good
                </SelectItem>
                <SelectItem
                  onClick={function () {
                    handleSatisfactionSubmit(SATISFACTION_TYPE.NEUTRAL);
                  }}
                >
                  Well....
                </SelectItem>
                <SelectItem
                  onClick={function () {
                    handleSatisfactionSubmit(SATISFACTION_TYPE.NEGATIVE);
                  }}
                >
                  {"I don't like this answer."}
                </SelectItem>
              </div>
            )}
            {isSelect && step === 8 && (
              <div className="flex w-full max-w-full flex-row justify-center gap-3">
                <SelectItem
                  onClick={function () {
                    handleSatisfactionSubmit(SATISFACTION_TYPE.POSITIVE);
                  }}
                >
                  😘 Good
                </SelectItem>
                <SelectItem
                  onClick={function () {
                    handleSatisfactionSubmit(SATISFACTION_TYPE.NEUTRAL);
                  }}
                >
                  Well....
                </SelectItem>
                <SelectItem
                  onClick={function () {
                    handleSatisfactionSubmit(SATISFACTION_TYPE.NEGATIVE);
                  }}
                >
                  {"I don't like this answer."}
                </SelectItem>
              </div>
            )}
            {isSelect && step === 10 && (
              <div className="flex w-full max-w-full flex-row justify-center gap-3">
                <SelectItem
                  onClick={function () {
                    handleRetrySubmit(true);
                  }}
                >
                  Yes, please.
                </SelectItem>
                <SelectItem
                  onClick={function () {
                    handleRetrySubmit(false);
                  }}
                >
                  {"No, I'm done."}
                </SelectItem>
              </div>
            )}
          </footer>
        )}
      </div>
    </div>
  );
}

export default Home;

const JesusMessage = function ({ type, isStart, time, content }) {
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

  return (
    <div className="flex min-w-full max-w-full flex-row gap-2">
      {isStart ? <Jesus /> : <div className=" w-12"></div>}
      <MessageWrapper type={type}>
        {isStart && <span className="text-sm font-bold text-black">Jesus</span>}
        <JesusBubble>{visible ? content : "...."}</JesusBubble>
      </MessageWrapper>
    </div>
  );
};

const UserMessage = function ({ type, content }) {
  return (
    <div className="my-2 flex min-w-full max-w-full flex-row gap-2">
      <div className=" w-12"></div>
      <MessageWrapper type={type}>
        <UserBubble>{content}</UserBubble>
      </MessageWrapper>
    </div>
  );
};

const SelectItem = function ({ onClick, children }) {
  return (
    <div
      onClick={onClick}
      className="flex h-12 w-max min-w-max cursor-pointer flex-row items-center rounded-3xl border border-indigo-900 bg-white px-3 py-4"
    >
      {children}
    </div>
  );
};
