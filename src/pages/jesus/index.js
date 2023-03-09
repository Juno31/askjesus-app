import React, { useEffect, useRef, useState } from "react";
import { useRouter } from "next/router";
import Image from "next/image";
import _ from "lodash";

//components
import BubbleWrapper from "@/components/Message/bubble-wrapper";
import JesusBubble from "@/components/Message/jesus-bubble";
import { BeatLoader } from "react-spinners";
import Background from "@/components/Background";
import Profile from "@/components/Profile";
import Warning from "@/components/Warning";
import JesusMessage from "@/components/Message/jesus-message";
import UserMessage from "@/components/Message/user-message";
import Input from "@/components/Input";

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
  SATISFACTION_TYPE,
} from "@/constants/service";
import Head from "next/head";

function Home() {
  const router = useRouter();
  const flow = new CounselingFlow();
  const [step, setStep] = useState(0);
  const [name, setName] = useState("");
  const [pid, setPid] = useState(null);
  const [agenda, setAgenda] = useState("");
  const [prayerType, setPrayerType] = useState();
  const [readyType, setReadyType] = useState(false);
  const [satisfactionType, setSatisfactionType] = useState();
  const [completions, setCompletions] = useState("");
  const [feedback, setFeedback] = useState("");
  const [retry, setRetry] = useState();
  const [chats, setChats] = useState([]);
  const [isInput, setIsInput] = useState(false);
  const [isSelect, setIsSelect] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [end, setEnd] = useState(false);
  const [attempt, setAttempt] = useState(1);

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

  const checkService = async function () {
    try {
      const serverReady = api.getServerStatus;
      const gptReady = api.getGPTStatus;

      const serviceReady = Promise.all([serverReady(), gptReady()]);

      return serviceReady;
    } catch (error) {
      throw error;
    }
  };

  const initialize = async function () {
    try {
      const serviceReady = await checkService();
      if (serviceReady) {
        setTimeout(function () {
          setStep(1);
        }, 1000);
      }
    } catch (error) {
      triggerMessage.announceOffline();
    }
  };

  const addChat = function (chat) {
    setChats((current) => [...current, chat]);
  };

  const addUserChat = function (chat) {
    setChats((current) => [...current, chat]);

    // if (pid) {
    //   api.createCounselingMessages({
    //     pid: pid,
    //     isContext: false,
    //     role: "assistant",
    //     content: chat.content,
    //   });
    // }
  };

  const addAssistantChat = function (chat) {
    setChats((current) => [...current, chat]);

    // if (pid) {
    //   api.createCounselingMessages({
    //     pid: pid,
    //     isContext: false,
    //     role: "assistant",
    //     content: chat.content,
    //   });
    // }
  };

  const addUserParameter = function (key, chat) {
    setChats((current) => [...current, chat]);

    if (pid) {
      api.createCounselingParameters({
        pid: pid,
        key: key,
        value: chat.content,
      });
    }
  };

  const triggerMessage = {
    announceOffline: function () {
      setIsInput(false);
      setIsSelect(false);
      addAssistantChat({
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
        addAssistantChat({
          type: MESSAGE_TYPE.JESUS,
          isStart: false,
          time: 1000,
          content: replaceVariable(
            flow.getRandomText("announce_offline_retry"),
            "name",
            name
          ),
        });
      }, 1800);

      setTimeout(function () {
        setEnd(true);
      }, 3600);
    },
    announceFailure: function () {
      setIsInput(false);
      setIsSelect(false);
      addAssistantChat({
        type: MESSAGE_TYPE.JESUS,
        isStart: true,
        time: 1000,
        content: replaceVariable(
          flow.getRandomText("announce_failure_reason"),
          "name",
          name
        ),
      });

      setTimeout(function () {
        addAssistantChat({
          type: MESSAGE_TYPE.JESUS,
          isStart: false,
          time: 1000,
          content: replaceVariable(
            flow.getRandomText("announce_failure_retry"),
            "name",
            name
          ),
        });
      }, 1800);

      setTimeout(function () {
        setEnd(true);
      }, 3600);
    },
    askName: function () {
      addAssistantChat({
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
        addAssistantChat({
          type: MESSAGE_TYPE.JESUS,
          isStart: false,
          time: 1000,
          content: replaceVariable(
            flow.getRandomText("ask_name_talk"),
            "name",
            name
          ),
        });
      }, 1800);

      setTimeout(function () {
        addAssistantChat({
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
        }, 1800);
      }, 3600);
    },
    askAgenda: function () {
      addUserChat({
        type: MESSAGE_TYPE.USER,
        isStart: false,
        time: 0,
        content: name,
      });

      setTimeout(function () {
        addAssistantChat({
          type: MESSAGE_TYPE.JESUS,
          isStart: true,
          time: 1000,
          content: replaceVariable(
            flow.getRandomText("ask_agenda_welcome"),
            "name",
            name
          ),
        });
      }, 1800);

      setTimeout(function () {
        addAssistantChat({
          type: MESSAGE_TYPE.JESUS,
          isStart: false,
          time: 1000,
          content: replaceVariable(
            flow.getRandomText("ask_agenda_ask"),
            "name",
            name
          ),
        });
      }, 3600);

      setTimeout(function () {
        addAssistantChat({
          type: MESSAGE_TYPE.JESUS,
          isStart: false,
          time: 1000,
          content: replaceVariable(
            flow.getRandomText("ask_agenda_guide"),
            "name",
            name
          ),
        });
      }, 5400);

      setTimeout(function () {
        setIsInput(true);
      }, 7200);
    },
    askPrayer: function () {
      addChat({
        type: MESSAGE_TYPE.USER,
        isStart: false,
        time: 0,
        content: agenda,
      });

      setTimeout(function () {
        addAssistantChat({
          type: MESSAGE_TYPE.JESUS,
          isStart: true,
          time: 1000,
          content: replaceVariable(
            flow.getRandomText("ask_pray_react"),
            "name",
            name
          ),
        });
      }, 1800);

      setTimeout(function () {
        addAssistantChat({
          type: MESSAGE_TYPE.JESUS,
          isStart: false,
          time: 1000,
          content: replaceVariable(
            flow.getRandomText("ask_pray_think"),
            "name",
            name
          ),
        });
      }, 3600);

      setTimeout(function () {
        addAssistantChat({
          type: MESSAGE_TYPE.JESUS,
          isStart: false,
          time: 1000,
          content: replaceVariable(
            flow.getRandomText("ask_pray_ask"),
            "name",
            name
          ),
        });
      }, 5400);

      setTimeout(function () {
        setStep(3);
        setIsSelect(true);
      }, 7200);
    },
    acceptPrayer: function () {
      addUserParameter("pray", {
        type: MESSAGE_TYPE.USER,
        isStart: false,
        time: 0,
        content: flow
          .getChoices("pray")
          .find((choice) => choice.choice_name === prayerType).text,
      });

      setTimeout(function () {
        addAssistantChat({
          type: MESSAGE_TYPE.JESUS,
          isStart: true,
          time: 1000,
          content: replaceVariable(
            flow.getRandomText("accept_pray_thank"),
            "name",
            name
          ),
        });
      }, 1800);

      setTimeout(function () {
        setStep(5);
      }, 3600);
    },
    declinePrayer: function () {
      addUserParameter("pray", {
        type: MESSAGE_TYPE.USER,
        isStart: false,
        time: 0,
        content: flow
          .getChoices("pray")
          .find((choice) => choice.choice_name === prayerType).text,
      });

      setTimeout(function () {
        addAssistantChat({
          type: MESSAGE_TYPE.JESUS,
          isStart: true,
          time: 1000,
          content: replaceVariable(
            flow.getRandomText("decline_pray_react"),
            "name",
            name
          ),
        });
      }, 1800);

      setTimeout(function () {
        setStep(5);
      }, 3600);
    },
    askReady: function () {
      addAssistantChat({
        type: MESSAGE_TYPE.JESUS,
        isStart: false,
        time: 1000,
        content: replaceVariable(
          flow.getRandomText("ask_ready_finish"),
          "name",
          name
        ),
      });

      setTimeout(function () {
        addAssistantChat({
          type: MESSAGE_TYPE.JESUS,
          isStart: false,
          time: 1000,
          content: replaceVariable(
            flow.getRandomText("ask_ready_ready"),
            "name",
            name
          ),
        });
      }, 1800);

      setTimeout(function () {
        setIsSelect(true);
      }, 3600);
    },
    answerWord: function () {
      addUserParameter("ready", {
        type: MESSAGE_TYPE.USER,
        isStart: false,
        time: 0,
        content: flow
          .getChoices("ready")
          .find((choice) => choice.choice_name === readyType).text,
      });

      const splittedCompletion = completions.split(". ");

      const periodAddedCompletion = splittedCompletion.map(function (
        completion,
        index,
        array
      ) {
        if (index === array.length - 1) return completion;

        if (
          completion[completion.length - 1] !== "?" &&
          completion[completion.length - 1] !== "!"
        ) {
          completion = completion + ".";
        }

        return completion;
      });

      periodAddedCompletion.forEach(function (completion, index, array) {
        if (!completion) return;

        setTimeout(function () {
          addChat({
            type: MESSAGE_TYPE.JESUS,
            isStart: index === 0,
            time: 2000,
            content: completion,
          });
        }, index * 2000 + index * 800);
      });

      setTimeout(function () {
        setIsSelect(true);
      }, periodAddedCompletion.length * 2000 +
        (periodAddedCompletion.length + 1) * 800);
    },
    notReady: function () {
      addUserParameter("ready", {
        type: MESSAGE_TYPE.USER,
        isStart: false,
        time: 0,
        content: flow
          .getChoices("ready")
          .find((choice) => choice.choice_name === readyType).text,
      });

      setTimeout(function () {
        addAssistantChat({
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
        }, 3800);
      }, 1800);
    },
    satisfactionPositive: function () {
      addUserParameter("satisfaction", {
        type: MESSAGE_TYPE.USER,
        isStart: false,
        time: 0,
        content: flow
          .getChoices("satisfaction")
          .find((choice) => choice.choice_name === satisfactionType).text,
      });

      setTimeout(function () {
        addAssistantChat({
          type: MESSAGE_TYPE.JESUS,
          isStart: true,
          time: 1000,
          content: replaceVariable(
            flow.getRandomText("satisfaction_positive_react"),
            "name",
            name
          ),
        });
      }, 800);

      setTimeout(function () {
        addAssistantChat({
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
        }, 1800);
      }, 2600);
    },
    satisfactionNeutral: function () {
      addUserParameter("satisfaction", {
        type: MESSAGE_TYPE.USER,
        isStart: false,
        time: 0,
        content: flow
          .getChoices("satisfaction")
          .find((choice) => choice.choice_name === satisfactionType).text,
      });

      setTimeout(function () {
        addAssistantChat({
          type: MESSAGE_TYPE.JESUS,
          isStart: true,
          time: 1000,
          content: replaceVariable(
            flow.getRandomText("satisfaction_neutral_ask"),
            "name",
            name
          ),
        });
      }, 800);

      setTimeout(function () {
        setIsInput(true);
      }, 2600);
    },
    satisfactionNegative: function () {
      addUserParameter("satisfaction", {
        type: MESSAGE_TYPE.USER,
        isStart: false,
        time: 0,
        content: flow
          .getChoices("satisfaction")
          .find((choice) => choice.choice_name === satisfactionType).text,
      });

      setTimeout(function () {
        addAssistantChat({
          type: MESSAGE_TYPE.JESUS,
          isStart: true,
          time: 1000,
          content: replaceVariable(
            flow.getRandomText("satisfaction_negative_react"),
            "name",
            name
          ),
        });
      }, 800);

      setTimeout(function () {
        addAssistantChat({
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
        }, 1800);
      }, 2600);
    },
    feedbackLong: function () {
      addUserChat({
        type: MESSAGE_TYPE.USER,
        isStart: false,
        time: 0,
        content: feedback,
      });

      setTimeout(function () {
        addAssistantChat({
          type: MESSAGE_TYPE.JESUS,
          isStart: true,
          time: 1000,
          content: replaceVariable(
            flow.getRandomText("feedback_long_react"),
            "name",
            name
          ),
        });
      }, 800);

      setTimeout(function () {
        addAssistantChat({
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
      }, 2600);
    },
    feedbackShort: function () {
      addUserChat({
        type: MESSAGE_TYPE.USER,
        isStart: false,
        time: 0,
        content: feedback,
      });

      setTimeout(function () {
        addAssistantChat({
          type: MESSAGE_TYPE.JESUS,
          isStart: true,
          time: 1000,
          content: replaceVariable(
            flow.getRandomText("feedback_short_react"),
            "name",
            name
          ),
        });
      }, 800);

      setTimeout(function () {
        setStep(10);
      }, 2600);
    },
    askRetry: function () {
      addAssistantChat({
        type: MESSAGE_TYPE.JESUS,
        isStart: false,
        time: 1000,
        content: replaceVariable(
          flow.getRandomText("ask_retry_ask"),
          "name",
          name
        ),
      });

      setTimeout(function () {
        setIsSelect(true);
      }, 1800);
    },
    nextAgenda: function () {
      addUserParameter("retry", {
        type: MESSAGE_TYPE.USER,
        isStart: false,
        time: 0,
        content: flow
          .getChoices("retry")
          .find((choice) => choice.choice_name === true).text,
      });

      setTimeout(function () {
        addAssistantChat({
          type: MESSAGE_TYPE.JESUS,
          isStart: true,
          time: 1000,
          content: replaceVariable(
            flow.getRandomText("next_agenda_talk"),
            "name",
            name
          ),
        });
      }, 1800);

      setTimeout(function () {
        addAssistantChat({
          type: MESSAGE_TYPE.JESUS,
          isStart: false,
          time: 1000,
          content: replaceVariable(
            flow.getRandomText("next_agenda_ask"),
            "name",
            name
          ),
        });
      }, 3600);

      setTimeout(function () {
        setIsInput(true);
      }, 5400);
    },
    announceEnd: function () {
      addUserParameter("retry", {
        type: MESSAGE_TYPE.USER,
        isStart: false,
        time: 0,
        content: flow
          .getChoices("retry")
          .find((choice) => choice.choice_name === false).text,
      });

      setTimeout(function () {
        addAssistantChat({
          type: MESSAGE_TYPE.JESUS,
          time: 1000,
          isStart: true,
          content: replaceVariable(
            flow.getRandomText("announce_end_react"),
            "name",
            name
          ),
        });
      }, 800);

      setTimeout(function () {
        addAssistantChat({
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
      }, 2600);
    },
  };

  const handleArrowClick = function () {
    setWarning(true);
  };

  const handleShareClick = function () {
    navigator.clipboard.writeText(process.env.FRONT_HOST);
    handleToast("Link Copied to clipboard");
  };

  const checkEnter = function (e) {
    return e.key === "Enter";
  };

  const handleNameSubmit = async function () {
    if (name?.length) {
      try {
        const response = await api.createCounseling(name);
        const pid = response.payload.pid;

        setPid(pid);
        setIsInput(false);
        setStep(2);
      } catch (error) {
        triggerMessage.announceOffline();
      }
    }
  };

  const handleAgendaSubmit = async function () {
    try {
      const serviceReady = await checkService();

      if (serviceReady) {
        setIsInput(false);
        getChatGpt();
        setStep(3);
      }
    } catch (error) {
      triggerMessage.announceFailure();
    }
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
      triggerMessage.announceOffline();
    }
  };

  const handleReadySubmit = function (type) {
    setIsSelect(false);
    setReadyType(type);
    setStep(7);
  };

  const handleRetrySubmit = function (type) {
    setIsSelect(false);
    setRetry(type);

    if (type) {
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
          if (prayerType) {
            triggerMessage.acceptPrayer();
          } else {
            triggerMessage.declinePrayer();
          }
        } else if (step === 6) {
          triggerMessage.askReady();
        } else if (step === 7) {
          if (readyType) {
            triggerMessage.answerWord();
          } else {
            triggerMessage.notReady();
          }
        } else if (step === 8) {
          if (satisfactionType === "positive") {
            triggerMessage.satisfactionPositive();
          } else if (satisfactionType === "neutral") {
            triggerMessage.satisfactionNeutral();
          } else if (satisfactionType === "negative") {
            triggerMessage.satisfactionNegative();
          }
        } else if (step === 9) {
          if (feedback.length > 29) {
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

  console.log(retry);

  return (
    <div className="container relative m-auto flex h-max justify-center">
      <Head>
        <title>{"Ask Jesus | Chat"}</title>
      </Head>
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
                <Input
                  onChange={function (e) {
                    setName(e.target.value);
                  }}
                  onKeyUp={function (e) {
                    if (checkEnter(e)) {
                      handleNameSubmit();
                    }
                  }}
                  placeholder={"Type a message"}
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
                <Input
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
                <Input
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
                <Input
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
              <SelectItemWrapper>
                {flow.getChoices("pray").map(function (choice) {
                  return (
                    <SelectItem
                      key={choice.response_name + choice.choice + choice.order}
                      onClick={function () {
                        handleAmenSubmit(choice.choice_name);
                      }}
                    >
                      {choice.text}
                    </SelectItem>
                  );
                })}
              </SelectItemWrapper>
            )}
            {isSelect && step === 6 && (
              <SelectItemWrapper>
                {flow.getChoices("ready").map(function (choice) {
                  return (
                    <SelectItem
                      key={choice.response_name + choice.choice + choice.order}
                      onClick={function () {
                        handleReadySubmit(choice.choice_name);
                      }}
                    >
                      {choice.text}
                    </SelectItem>
                  );
                })}
              </SelectItemWrapper>
            )}
            {isSelect && step === 7 && (
              <SelectItemWrapper>
                {flow.getChoices("satisfaction").map(function (choice) {
                  return (
                    <SelectItem
                      key={choice.response_name + choice.choice + choice.order}
                      onClick={function () {
                        handleSatisfactionSubmit(choice.choice_name);
                      }}
                    >
                      {choice.text}
                    </SelectItem>
                  );
                })}
              </SelectItemWrapper>
            )}
            {isSelect && step === 8 && (
              <SelectItemWrapper>
                {flow.getChoices("satisfaction").map(function (choice) {
                  return (
                    <SelectItem
                      key={choice.response_name + choice.choice + choice.order}
                      onClick={function () {
                        handleSatisfactionSubmit(choice.choice_name);
                      }}
                    >
                      {choice.text}
                    </SelectItem>
                  );
                })}
              </SelectItemWrapper>
            )}
            {isSelect && step === 10 && (
              <SelectItemWrapper>
                {flow.getChoices("retry").map(function (choice) {
                  return (
                    <SelectItem
                      key={choice.response_name + choice.choice + choice.order}
                      onClick={function () {
                        handleRetrySubmit(choice.choice_name);
                      }}
                    >
                      {choice.text}
                    </SelectItem>
                  );
                })}
              </SelectItemWrapper>
            )}
          </footer>
        )}
      </div>
    </div>
  );
}

export default Home;

const SelectItemWrapper = function ({ children }) {
  const ref = useRef();

  useEffect(function () {
    const wrapperWidth = ref.current.clientWidth;
    let totalWidth = 0;

    console.log(document.querySelectorAll("#select-item-wrapper"));
    document
      .querySelectorAll("#select-item-wrapper > *")
      .forEach(function (child) {
        totalWidth = totalWidth + child.offsetWidth;
      });

    if (wrapperWidth < totalWidth) {
      ref.current.classList.remove("justify-center");
      ref.current.classList.add("justify-start");
      ref.current.classList.add("overflow-x-auto");
    }
  }, []);

  return (
    <div
      id="select-item-wrapper"
      ref={ref}
      className="scrollbar-hidden flex w-full max-w-full flex-row justify-center gap-3"
    >
      {children}
    </div>
  );
};

const SelectItem = function ({ onClick, children }) {
  return (
    <div
      onClick={onClick}
      className=" hover:bg-kaya-hover active:bg-kaya-active border-kaya-black flex h-12 w-max min-w-max cursor-pointer flex-row items-center overflow-hidden rounded-3xl border bg-white px-3 py-4"
    >
      {children}
    </div>
  );
};
