import React, { useEffect, useLayoutEffect, useState } from "react";
import { useRouter } from "next/router";
import Image from "next/image";
import _ from "lodash";

//components
import BubbleWrapper from "@/components/Message/bubble-wrapper";
import JesusBubble from "@/components/Message/jesus-bubble";
import UserBubble from "@/components/Message/user-bubble";
import Jesus from "@/components/Message/jesus-profile-image";
import { BeatLoader } from "react-spinners";
import Background from "@/components/Background";
import Profile from "@/components/Profile";
import Warning from "@/components/Warning";

//utils
import { CounselingFlow } from "@/utils/flow";
import replaceVariable from "@/utils/replaceVariable";

//api
import api from "@/apis";

//hook
import useToast from "@/hooks/useToast";

//constants
import {
  MESSAGE_TYPE,
  INPUT_DEFAULT,
  PRAYER_TYPE,
  READY_TYPE,
  SATISFACTION_TYPE,
} from "@/constants/service";

function Home() {
  const router = useRouter();
  const flow = new CounselingFlow();
  const [step, setStep] = useState(0);
  const [name, setName] = useState("");
  const [pid, setPid] = useState(null);
  const [agenda, setAgenda] = useState("");
  const [prayerType, setPrayerType] = useState();
  const [readyType, setReadyType] = useState(false);
  const [ssatisfactionType, setSatisfactionType] = useState();
  const [completions, setCompletions] = useState("");
  const [feedback, setFeedback] = useState("");
  // const [retry, setRetry] = useState();
  const [chats, setChats] = useState([]);
  const [isInput, setIsInput] = useState(false);
  const [isSelect, setIsSelect] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [end, setEnd] = useState(false);
  const [attempt, setAttempt] = useState(0);

  const [appear, setAppear] = useState(false);
  const [warning, setWarning] = useState(false);

  const { handleToast, component: Toast } = useToast();

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
      const response = await api.getServerStatus();

      if (response) {
        setTimeout(function () {
          setStep(1);
        }, 1000);
      }
    } catch (error) {
      triggerMessage.error();
    }
  };

  const addChat = function (chat) {
    setChats((current) => [...current, chat]);
    // scrollOnAdd();
  };

  const triggerMessage = {
    error: function () {
      setIsInput(false);
      setIsSelect(false);
      addChat({
        type: MESSAGE_TYPE.JESUS,
        isStart: true,
        time: 1000,
        content: replaceVariable(
          flow.getRandomText("announce_offline_reason"),
          "name",
          name
        ),
      });

      setTimeout(function () {
        addChat({
          type: MESSAGE_TYPE.JESUS,
          isStart: false,
          time: 1000,
          content: replaceVariable(
            flow.getRandomText("announce_offline_retry"),
            "name",
            name
          ),
        });
      }, 1000);
    },
    announceFailure: function () {
      setIsInput(false);
      setIsSelect(false);
      addChat({
        type: MESSAGE_TYPE.JESUS,
        isStart: true,
        time: 1000,
        content: replaceVariable(
          flow.getRandomText("announce_offline_reason"),
          "name",
          name
        ),
      });

      setTimeout(function () {
        addChat({
          type: MESSAGE_TYPE.JESUS,
          isStart: false,
          time: 1000,
          content: replaceVariable(
            flow.getRandomText("announce_offline_retry"),
            "name",
            name
          ),
        });
      }, 1000);
    },
    askName: function () {
      addChat({
        type: MESSAGE_TYPE.JESUS,
        isStart: true,
        time: 1000,
        content: replaceVariable(
          flow.getRandomText("ask_name_introduce"),
          "name",
          name
        ),
      });

      setTimeout(function () {
        addChat({
          type: MESSAGE_TYPE.JESUS,
          isStart: false,
          time: 1000,
          content: replaceVariable(
            flow.getRandomText("ask_name_talk"),
            "name",
            name
          ),
        });
      }, 1000);

      setTimeout(function () {
        addChat({
          type: MESSAGE_TYPE.JESUS,
          isStart: false,
          time: 1000,
          content: replaceVariable(
            flow.getRandomText("ask_name_ask"),
            "name",
            name
          ),
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
          content: replaceVariable(
            flow.getRandomText("ask_agenda_welcome"),
            "name",
            name
          ),
        });
      }, 1000);

      setTimeout(function () {
        addChat({
          type: MESSAGE_TYPE.JESUS,
          isStart: false,
          time: 1000,
          content: replaceVariable(
            flow.getRandomText("ask_agenda_ask"),
            "name",
            name
          ),
        });
      }, 2000);

      setTimeout(function () {
        addChat({
          type: MESSAGE_TYPE.JESUS,
          isStart: false,
          time: 1000,
          content: replaceVariable(
            flow.getRandomText("ask_agenda_guide"),
            "name",
            name
          ),
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
          content: replaceVariable(
            flow.getRandomText("ask_pray_react"),
            "name",
            name
          ),
        });
      }, 1000);

      setTimeout(function () {
        addChat({
          type: MESSAGE_TYPE.JESUS,
          isStart: false,
          time: 1000,
          content: replaceVariable(
            flow.getRandomText("ask_pray_think"),
            "name",
            name
          ),
        });
      }, 2000);

      setTimeout(function () {
        addChat({
          type: MESSAGE_TYPE.JESUS,
          isStart: false,
          time: 1000,
          content: replaceVariable(
            flow.getRandomText("ask_pray_ask"),
            "name",
            name
          ),
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
          content: replaceVariable(
            flow.getRandomText("accept_pray_thank"),
            "name",
            name
          ),
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
          content: replaceVariable(
            flow.getRandomText("decline_pray_react"),
            "name",
            name
          ),
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
        content: replaceVariable(
          flow.getRandomText("ask_ready_finish"),
          "name",
          name
        ),
      });
      addChat({
        type: MESSAGE_TYPE.JESUS,
        isStart: false,
        time: 1000,
        content: replaceVariable(
          flow.getRandomText("ask_ready_ready"),
          "name",
          name
        ),
      });

      setTimeout(function () {
        setIsSelect(true);
      }, 1000);
    },
    answerWord: function () {
      addChat({
        type: MESSAGE_TYPE.USER,
        isStart: false,
        time: 0,
        content: "🤗 Yes",
      });

      const splittedCompletion = completions.split(". ");

      splittedCompletion.forEach(function (completion, index, array) {
        if (!completion) return;

        setTimeout(function () {
          addChat({
            type: MESSAGE_TYPE.JESUS,
            isStart: index === 0,
            time: 2000,
            content: completion,
          });
        }, index * 2000);
      });

      setTimeout(function () {
        setIsSelect(true);
      }, splittedCompletion.length * 2000);
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
          content: replaceVariable(
            flow.getRandomText("not_ready_sorry"),
            "name",
            name
          ),
        });

        setTimeout(function () {
          setEnd(true);
        }, 2000);
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
          content: replaceVariable(
            flow.getRandomText("satisfaction_positive_react"),
            "name",
            name
          ),
        });
      }, 0);

      setTimeout(function () {
        addChat({
          type: MESSAGE_TYPE.JESUS,
          isStart: false,
          time: 1000,
          content: replaceVariable(
            flow.getRandomText("satisfaction_positive_ask"),
            "name",
            name
          ),
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
          content: replaceVariable(
            flow.getRandomText("satisfaction_neutral_ask"),
            "name",
            name
          ),
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
          content: replaceVariable(
            flow.getRandomText("satisfaction_negative_react"),
            "name",
            name
          ),
        });
      }, 0);

      setTimeout(function () {
        addChat({
          type: MESSAGE_TYPE.JESUS,
          isStart: true,
          time: 1000,
          content: replaceVariable(
            flow.getRandomText("satisfaction_negative_ask"),
            "name",
            name
          ),
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
        content: replaceVariable(
          flow.getRandomText("feedback_long_react"),
          "name",
          name
        ),
      });

      setTimeout(function () {
        addChat({
          type: MESSAGE_TYPE.JESUS,
          isStart: false,
          time: 1000,
          content: replaceVariable(
            flow.getRandomText("feedback_long_talk"),
            "name",
            name
          ),
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
        content: replaceVariable(
          flow.getRandomText("feedback_short_react"),
          "name",
          name
        ),
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
          content: replaceVariable(
            flow.getRandomText("ask_retry_ask"),
            "name",
            name
          ),
        },
      ]);

      setTimeout(function () {
        setIsSelect(true);
      }, 1000);
    },
    nextAgenda: function () {
      addChat({
        type: MESSAGE_TYPE.USER,
        isStart: false,
        time: 0,
        content: "Yes, please.",
      });

      setTimeout(function () {
        addChat({
          type: MESSAGE_TYPE.JESUS,
          isStart: true,
          time: 1000,
          content: replaceVariable(
            flow.getRandomText("next_agenda_talk"),
            "name",
            name
          ),
        });
      }, 1000);

      setTimeout(function () {
        addChat({
          type: MESSAGE_TYPE.JESUS,
          isStart: false,
          time: 1000,
          content: replaceVariable(
            flow.getRandomText("next_agenda_ask"),
            "name",
            name
          ),
        });
      }, 2000);

      setTimeout(function () {
        setIsInput(true);
      }, 3000);
    },
    announceEnd: function () {
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
        content: replaceVariable(
          flow.getRandomText("announce_end_react"),
          "name",
          name
        ),
      });

      setTimeout(function () {
        addChat({
          type: MESSAGE_TYPE.JESUS,
          isStart: false,
          time: 1000,
          content: replaceVariable(
            flow.getRandomText("announce_end_talk"),
            "name",
            name
          ),
        });

        setTimeout(function () {
          setEnd(true);
        }, 1500);
      }, 1000);
    },
  };

  const handleArrowClick = function () {
    setWarning(true);
  };

  const handleShareClick = function () {
    navigator.clipboard.writeText(process.env.FRONT_HOST);
    handleToast("Copied to clipboard");
  };

  const checkEnter = function (e) {
    return e.key === "Enter";
  };

  const handleNameSubmit = async function () {
    if (name?.length) {
      try {
        const response = await api.createCounseling(name);
        const pid = response.payload.pid;

        api.registerParameters(pid, "name", name);
        setPid(pid);
        setIsInput(false);
        setStep(2);
      } catch (error) {
        triggerMessage.error();
      }
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
      const currentAttempt = attempt;
      const response = await api.createCounselingMessages({
        pid,
        isContext: true,
        role: "user",
        content: agenda,
      });

      const completion =
        response.payload.messages[response.payload.messages.length - 1].content;

      setAttempt((current) => current + 1);
      setCompletions(completion);
      setIsLoading(false);
      api.patchCounseling(pid, currentAttempt + 1);
    } catch (error) {
      setIsLoading(false);
      triggerMessage.error();
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
      triggerMessage.nextAgenda();
    } else {
      triggerMessage.announceEnd();
    }
  };

  useEffect(
    // triggerMessage on step change
    function () {
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

      stepListener(step);
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

  useEffect(
    // scroll on message triggered
    function () {
      const currentHeight = document.documentElement.scrollHeight; // document height

      if (window.innerHeight < currentHeight) {
        window.scrollTo({ top: currentHeight, behavior: "smooth" });
      }
    },
    [chats]
  );

  return (
    <div className="container relative m-auto flex h-max justify-center">
      {Toast}
      <Background />
      <Profile
        appear={appear}
        closeProfile={function () {
          setAppear(false);
        }}
      />
      <Warning
        warning={warning}
        cancel={function () {
          setWarning(false);
        }}
        leave={function () {
          setWarning(false);
          router.push("/");
        }}
      />
      <div className="max-w-kaya relative flex w-full flex-col items-center bg-white bg-opacity-0">
        <header className="max-w-kaya z-5 fixed top-0 flex h-16 w-full flex-row justify-between bg-white bg-opacity-0 px-4 py-4">
          <Image
            src={"/icons/arrow-left-icon.svg"}
            width={23.35}
            height="20"
            className="cursor-pointer active:scale-95"
            onClick={handleArrowClick}
            alt={"back arrow"}
          />
          <div className="font-bold text-white">Jesus</div>
          <div
            className="text-kaya-500 cursor-pointer font-semibold"
            onClick={handleShareClick}
          >
            Share
          </div>
        </header>
        <div className="flex min-w-full max-w-full justify-center px-4 pt-16">
          <section className="flex w-full max-w-full flex-col gap-2 rounded-3xl">
            <p className="flex min-w-full flex-row items-center justify-center py-4 font-medium text-white">
              Jesus has entered the chat.
            </p>
            {chats.map(function (chat, index) {
              const type = chat.type;
              const isStart = chat.isStart;
              const time = chat.time;
              const content = chat.content;

              if (type === MESSAGE_TYPE.JESUS) {
                return (
                  <JesusMessage
                    key={chat.type + chat.time + chat.content + index}
                    type={type}
                    isStart={isStart}
                    time={time}
                    content={content}
                    openProfile={function () {
                      setAppear(true);
                    }}
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
                <BubbleWrapper type={MESSAGE_TYPE.JESUS}>
                  <JesusBubble>
                    {" "}
                    <BeatLoader
                      color={"#f1c5f7"}
                      size={"8px"}
                      speedMultiplier={"0.5"}
                    />
                  </JesusBubble>
                </BubbleWrapper>
              </div>
            )}
            {end && (
              <p className="mt-1 min-w-full py-3 text-center text-base font-medium text-white">
                Jesus left the chat.
              </p>
            )}
            <div className="h-32 min-w-full"></div>
          </section>
        </div>
        {(isInput || isSelect) && (
          <footer className="max-w-kaya z-5 fixed bottom-0 flex w-full flex-row justify-between gap-2 bg-transparent bg-white bg-opacity-0 px-4 py-4">
            {isInput && step === 1 && (
              <>
                <input
                  className="focus:border-kaya-black h-12 flex-1 rounded-3xl bg-gray-200 px-4 py-3 placeholder:font-light"
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
                  className="cursor-pointer active:scale-95"
                  src={
                    name
                      ? "/icons/send-message-active-icon.svg"
                      : "/icons/send-message-icon.svg"
                  }
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
                  className="focus:border-kaya-black h-12 flex-1 rounded-3xl bg-gray-200 px-4 py-3 placeholder:font-light"
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
                  className="cursor-pointer active:scale-95"
                  src={
                    agenda
                      ? "/icons/send-message-active-icon.svg"
                      : "/icons/send-message-icon.svg"
                  }
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
                  className="focus:border-kaya-black h-12 flex-1 rounded-3xl bg-gray-200 px-4 py-3 placeholder:font-light"
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
                  className="cursor-pointer active:scale-95"
                  src={
                    feedback
                      ? "/icons/send-message-active-icon.svg"
                      : "/icons/send-message-icon.svg"
                  }
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
                  className="focus:border-kaya-black h-12 flex-1 rounded-3xl bg-gray-200 px-4 py-3 placeholder:font-light"
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
                  className="cursor-pointer active:scale-95"
                  src={
                    agenda
                      ? "/icons/send-message-active-icon.svg"
                      : "/icons/send-message-icon.svg"
                  }
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

const JesusMessage = function ({ type, isStart, time, content, openProfile }) {
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
      {isStart ? (
        <Jesus onClick={openProfile} />
      ) : (
        <div className=" w-12"></div>
      )}
      <BubbleWrapper type={type}>
        {isStart && <span className="text-sm font-bold text-white">Jesus</span>}
        <JesusBubble>
          {visible ? (
            content
          ) : (
            <BeatLoader
              color={"#f1c5f7"}
              size={"8px"}
              speedMultiplier={"0.5"}
            />
          )}
        </JesusBubble>
      </BubbleWrapper>
    </div>
  );
};

const UserMessage = function ({ type, content }) {
  return (
    <div className="my-2 flex min-w-full max-w-full flex-row gap-2">
      <div className=" w-12"></div>
      <BubbleWrapper type={type}>
        <UserBubble>{content}</UserBubble>
      </BubbleWrapper>
    </div>
  );
};

const SelectItem = function ({ onClick, children }) {
  return (
    <div
      onClick={onClick}
      className="hover:bg-kaya-hover active:bg-kaya-active border-kaya-black flex h-12 w-max min-w-max cursor-pointer flex-row items-center rounded-3xl border bg-white px-3 py-4"
    >
      {children}
    </div>
  );
};
