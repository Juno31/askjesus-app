import React, { useEffect, useRef, useState } from "react";
import { useRouter } from "next/router";
import Image from "next/image";
import _, { replace } from "lodash";

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
import AppearText from "@/components/AppearText";
import Header from "@/components/Header";

//utils
import { CounselingFlow } from "@/utils/flow";
import replaceVariable from "@/utils/replaceVariable";
import getTextLoadingTime from "@/utils/getTextLoadingTime";

//api
import api from "@/apis";

//hook
import useToast from "@/hooks/useToast";

//constants
import {
  MESSAGE_TYPE,
  INPUT_DEFAULT,
  MESSAGE_GAP,
  REGEX,
} from "@/constants/service";
import Head from "next/head";
import ReactGA from "react-ga4";

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

  const [isError, setIsError] = useState(false);

  const { handleToast, component: Toast } = useToast();

  const triggerMessage = {
    announce_offline: function () {
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
        attempt: attempt,
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
          attempt: attempt,
        });

        setTimeout(function () {
          setEnd(true);
        }, MESSAGE_GAP);
      }, 1000 + MESSAGE_GAP);
    },
    announce_failure: function () {
      setIsInput(false);
      setIsSelect(false);
      addChat({
        type: MESSAGE_TYPE.JESUS,
        isStart: true,
        time: 1000,
        content: replaceVariable(
          flow.getRandomText("announce_failure_reason"),
          "name",
          name
        ),
        attempt: attempt,
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
          attempt: attempt,
        });

        setTimeout(function () {
          setEnd(true);
        }, MESSAGE_GAP);
      }, 1000 + MESSAGE_GAP);
    },
    ask_name: function () {
      generateMessagesByChunkName("ask_name", function () {
        setIsInput(true);
      });
    },
    ask_agenda: function () {
      addUserChat(
        { key: "name", value: name },
        {
          type: MESSAGE_TYPE.USER,
          isStart: false,
          time: 0,
          content: name,
          attempt: attempt,
        }
      );

      setTimeout(function () {
        generateMessagesByChunkName("ask_agenda", function () {
          setIsInput(true);
        });
      }, MESSAGE_GAP);
    },
    agenda_long: function () {
      addChat({
        type: MESSAGE_TYPE.USER,
        isStart: false,
        time: 0,
        content: agenda,
        attempt: attempt,
      });

      setTimeout(function () {
        generateMessagesByChunkName("agenda_long", function () {
          setStep(3);
        });
      }, MESSAGE_GAP);
    },
    agenda_short: function () {
      addChat({
        type: MESSAGE_TYPE.USER,
        isStart: false,
        time: 0,
        content: agenda,
        attempt: attempt,
      });

      setTimeout(function () {
        generateMessagesByChunkName("agenda_short", function () {
          setStep(3);
        });
      }, MESSAGE_GAP);
    },
    agenda_tiny: function () {
      addUserChat(null, {
        type: MESSAGE_TYPE.USER,
        isStart: true,
        time: 0,
        content: agenda,
        attempt: attempt,
      });

      setTimeout(function () {
        generateMessagesByChunkName("agenda_tiny", function () {
          setAgenda("");
          setIsInput(true);
        });
      }, MESSAGE_GAP);
    },
    announce_reject: function () {
      addUserChat(null, {
        type: MESSAGE_TYPE.USER,
        isStart: false,
        time: 1000,
        content: agenda,
        attempt: attempt,
      });

      setTimeout(function () {
        generateMessagesByChunkName("announce_reject", function () {
          setEnd(true);
        });
      }, 1000 + MESSAGE_GAP);
    },
    ask_pray: function () {
      generateMessagesByChunkName(
        "ask_pray",
        function () {
          setStep(3);
          setIsSelect(true);
        },
        true
      );
    },
    accept_prayer: function () {
      addUserParameter(
        { key: "pray", value: prayerType },
        {
          type: MESSAGE_TYPE.USER,
          isStart: false,
          time: 0,
          content: flow
            .getChoices("pray")
            .find((choice) => choice.choice_name === prayerType).text,
          attempt: attempt,
        }
      );

      setTimeout(function () {
        generateMessagesByChunkName("accept_pray", function () {
          setStep(5);
        });
      }, MESSAGE_GAP);
    },
    decline_prayer: function () {
      addUserParameter(
        { key: "pray", value: prayerType },
        {
          type: MESSAGE_TYPE.USER,
          isStart: false,
          time: 0,
          content: flow
            .getChoices("pray")
            .find((choice) => choice.choice_name === prayerType).text,
          attempt: attempt,
        }
      );

      setTimeout(function () {
        generateMessagesByChunkName("decline_pray", function () {
          setStep(5);
        });
      }, MESSAGE_GAP);
    },
    ask_ready: function () {
      generateMessagesByChunkName(
        "ask_ready",
        function () {
          setIsSelect(true);
        },
        true
      );
    },
    answer_word: function () {
      addUserParameter(
        { key: "ready", value: readyType },
        {
          type: MESSAGE_TYPE.USER,
          isStart: false,
          time: 0,
          content: flow
            .getChoices("ready")
            .find((choice) => choice.choice_name === readyType).text,
          attempt: attempt,
        }
      );

      setTimeout(function () {
        generateGptMessages(completions, function () {
          setIsSelect(true);
        });
      }, MESSAGE_GAP);
    },
    not_ready: function () {
      addUserParameter(
        { key: "ready", value: readyType },
        {
          type: MESSAGE_TYPE.USER,
          isStart: false,
          time: 0,
          content: flow
            .getChoices("ready")
            .find((choice) => choice.choice_name === readyType).text,
          attempt: attempt,
        }
      );

      setTimeout(function () {
        generateMessagesByChunkName("not_ready", function () {
          setEnd(true);
        });
      }, MESSAGE_GAP);
    },
    satisfaction_positive: function () {
      addUserParameter(
        { key: "satisfaction", value: satisfactionType },
        {
          type: MESSAGE_TYPE.USER,
          isStart: false,
          time: 0,
          content: flow
            .getChoices("satisfaction")
            .find((choice) => choice.choice_name === satisfactionType).text,
          attempt: attempt,
        }
      );

      setTimeout(function () {
        generateMessagesByChunkName("satisfaction_positive", function () {
          setIsInput(true);
        });
      }, MESSAGE_GAP);
    },
    satisfaction_neutral: function () {
      addUserParameter(
        { key: "satisfaction", value: satisfactionType },
        {
          type: MESSAGE_TYPE.USER,
          isStart: false,
          time: 0,
          content: flow
            .getChoices("satisfaction")
            .find((choice) => choice.choice_name === satisfactionType).text,
          attempt: attempt,
        }
      );

      setTimeout(function () {
        generateMessagesByChunkName("satisfaction_neutral", function () {
          setIsInput(true);
        });
      }, MESSAGE_GAP);
    },
    satisfaction_negative: function () {
      addUserParameter(
        { key: "satisfaction", value: satisfactionType },
        {
          type: MESSAGE_TYPE.USER,
          isStart: false,
          time: 0,
          content: flow
            .getChoices("satisfaction")
            .find((choice) => choice.choice_name === satisfactionType).text,
          attempt: attempt,
        }
      );

      setTimeout(function () {
        generateMessagesByChunkName("satisfaction_negative", function () {
          setIsInput(true);
        });
      }, MESSAGE_GAP);
    },
    feedback_long: function () {
      addUserChat(
        { key: "feedback", value: feedback },
        {
          type: MESSAGE_TYPE.USER,
          isStart: false,
          time: 0,
          content: feedback,
          attempt: attempt,
        }
      );

      setTimeout(function () {
        generateMessagesByChunkName("feedback_long", function () {
          setStep(10);
        });
      }, MESSAGE_GAP);
    },
    feedback_short: function () {
      addUserChat(
        { key: "feedback", value: feedback },
        {
          type: MESSAGE_TYPE.USER,
          isStart: false,
          time: 0,
          content: feedback,
          attempt: attempt,
        }
      );

      setTimeout(function () {
        generateMessagesByChunkName("feedback_short", function () {
          setStep(10);
        });
      }, MESSAGE_GAP);
    },
    feedback_tiny: function () {
      addUserChat(
        { key: "feedback", value: feedback },
        {
          type: MESSAGE_TYPE.USER,
          isStart: false,
          time: 0,
          content: feedback,
          attempt: attempt,
        }
      );

      setTimeout(function () {
        setStep(10);
      }, MESSAGE_GAP);
    },
    ask_retry: function () {
      generateMessagesByChunkName(
        "ask_retry",
        function () {
          setIsSelect(true);
        },
        chats?.[chats.length - 1].type === MESSAGE_TYPE.JESUS
      );
    },
    next_agenda: function () {
      addUserParameter(
        { key: "retry", value: true },
        {
          type: MESSAGE_TYPE.USER,
          isStart: false,
          time: 0,
          content: flow
            .getChoices("retry")
            .find((choice) => choice.choice_name === true).text,
          attempt: attempt,
        }
      );

      api.patchCounseling(pid, attempt + 1);
      setAttempt((current) => current + 1);

      setTimeout(function () {
        generateMessagesByChunkName("next_agenda", function () {
          setIsInput(true);
        });
      }, MESSAGE_GAP);
    },
    announce_end: function () {
      setIsInput(false);
      setIsSelect(false);
      addUserParameter(
        { key: "retry", value: false },
        {
          type: MESSAGE_TYPE.USER,
          isStart: false,
          time: 0,
          content: flow
            .getChoices("retry")
            .find((choice) => choice.choice_name === false).text,
          attempt: attempt,
        }
      );

      setTimeout(function () {
        generateMessagesByChunkName("announce_end", function () {
          setEnd(true);
        });
      }, MESSAGE_GAP);
    },
  };

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

      setCompletions(completion);
      setIsLoading(false);
    } catch (error) {
      setIsError(true);
      setIsLoading(false);

      setTimeout(function () {
        triggerMessage.announce_offline();
      }, MESSAGE_GAP);
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
      triggerMessage.announce_offline();
    }
  };

  const addChat = function (chat) {
    setChats((current) => [...current, chat]);
  };

  const addUserChat = function (body, chat) {
    if (!isError) {
      setChats((current) => [...current, chat]);

      if (pid && body) {
        api.createCounselingParameters({
          pid: pid,
          key: body.key,
          value: body.value,
        });
      }
    }

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
    if (!isError) {
      setChats((current) => [...current, chat]);
    }

    // if (pid) {
    //   api.createCounselingMessages({
    //     pid: pid,
    //     isContext: false,
    //     role: "assistant",
    //     content: chat.content,
    //   });
    // }
  };

  const addUserParameter = function (body, chat) {
    if (!isError) {
      setChats((current) => [...current, chat]);

      if (pid && body) {
        api.createCounselingParameters({
          pid: pid,
          key: body.key,
          value: body.value,
        });
      }
    }
  };

  const generateMessagesByChunkName = function (
    chunk_name,
    callback,
    noStart = false
  ) {
    const messages = flow.getChunkMessages(chunk_name); // array and sorted in order
    let previousTextLoadingTimes = 0;

    messages.forEach(function (message, index, array) {
      const text = replaceVariable(
        flow.getRandomText(message.message_code),
        "name",
        name
      );
      const textLoadingTime = getTextLoadingTime(text);

      setTimeout(function () {
        addAssistantChat({
          type: MESSAGE_TYPE.JESUS,
          isStart: index === 0 && !noStart,
          time: textLoadingTime,
          content: text,
          attempt: attempt,
        });

        if (index === array.length - 1) {
          setTimeout(function () {
            callback();
          }, textLoadingTime + MESSAGE_GAP);
        }
      }, previousTextLoadingTimes + index * MESSAGE_GAP);

      previousTextLoadingTimes += textLoadingTime;
    });
  };

  const generateGptMessages = function (completions, callback) {
    const verse = completions.match(REGEX.VERSE)?.[0];
    const pureCompletion = completions.replace(verse, "");

    const splittedCompletion = pureCompletion
      .split(". ")
      .filter((completion) => completion.length);

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
    let previousCompletionLoadingTimes = 0;

    if (verse) periodAddedCompletion.push(verse);

    periodAddedCompletion.forEach(function (completion, index, array) {
      if (!completion) return;

      const completionLoadingTime = getTextLoadingTime(completion);

      setTimeout(function () {
        addChat({
          type: MESSAGE_TYPE.JESUS,
          isStart: index === 0,
          time: completionLoadingTime,
          content: completion,
          attempt: attempt,
        });

        if (index === array.length - 1) {
          setTimeout(function () {
            callback();
          }, completionLoadingTime + MESSAGE_GAP);
        }
      }, previousCompletionLoadingTimes + index * MESSAGE_GAP);

      previousCompletionLoadingTimes += completionLoadingTime;
    });
  };

  const handleArrowClick = function () {
    setWarning(true);
  };

  const handleShareClick = function () {
    navigator.clipboard.writeText(process.env.FRONT_HOST);
    handleToast("Link copied to clipboard");
  };

  const checkEnter = function (e) {
    return e.key === "Enter";
  };

  const handleNameSubmit = async function () {
    if (name?.length) {
      try {
        ReactGA.event("name_submit");
        const response = await api.createCounseling(name);
        const pid = response.payload.pid;

        setPid(pid);
        setIsInput(false);
        setStep(2);
      } catch (error) {
        setIsError(true);

        setTimeout(function () {
          triggerMessage.announce_offline();
        }, MESSAGE_GAP);
      }
    }
  };

  const handleAgendaSubmit = async function () {
    try {
      ReactGA.event("agenda_submit");
      setIsInput(false);
      await checkService();

      if (agenda.length < 10) {
        const no = _.random(1, 10);

        if (no <= 7) {
          triggerMessage.agenda_tiny();
        } else {
          triggerMessage.announce_reject();
        }
      } else if (agenda.length < 30) {
        getChatGpt();
        triggerMessage.agenda_short();
      } else {
        getChatGpt();
        triggerMessage.agenda_long();
      }
    } catch (error) {
      setIsError(true);

      setTimeout(function () {
        triggerMessage.announce_failure();
      }, MESSAGE_GAP);
    }
  };

  const handleAmenSelect = function (type) {
    setIsSelect(false);
    setPrayerType(type);
    setStep(4);
  };

  const handleSatisfactionSelect = function (type) {
    setIsSelect(false);
    setSatisfactionType(type);
    setStep(8);
  };

  const handleFeedbackSubmit = function () {
    setIsInput(false);
    setStep(9);
  };

  const handleReadySelect = function (type) {
    setIsSelect(false);
    setReadyType(type);
    setStep(7);
  };

  const handleRetrySelect = function (type) {
    setIsSelect(false);
    setRetry(type);

    if (type) {
      setAgenda(null);
      triggerMessage.next_agenda();
    } else {
      triggerMessage.announce_end();
    }
  };

  useEffect(
    function () {
      const stepListener = function (step) {
        if (step === 0) {
          setTimeout(function () {
            initialize();
          }, 500);
        } else if (step === 1) {
          triggerMessage.ask_name();
        } else if (step === 2) {
          triggerMessage.ask_agenda();
        } else if (step === 3) {
          triggerMessage.ask_pray();
        } else if (step === 4) {
          if (prayerType) {
            triggerMessage.accept_prayer();
          } else {
            triggerMessage.decline_prayer();
          }
        } else if (step === 6) {
          triggerMessage.ask_ready();
        } else if (step === 7) {
          if (readyType) {
            triggerMessage.answer_word();
          } else {
            triggerMessage.not_ready();
          }
        } else if (step === 8) {
          if (satisfactionType === "positive") {
            triggerMessage.satisfaction_positive();
          } else if (satisfactionType === "neutral") {
            triggerMessage.satisfaction_neutral();
          } else if (satisfactionType === "negative") {
            triggerMessage.satisfaction_negative();
          }
        } else if (step === 9) {
          if (feedback.length >= 30) {
            triggerMessage.feedback_long();
          } else if (feedback.length >= 10) {
            triggerMessage.feedback_short();
          } else {
            triggerMessage.feedback_tiny();
          }
        } else if (step === 10) {
          triggerMessage.ask_retry();
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

  return (
    <div className="container relative m-auto flex h-max justify-center">
      <Head>
        <title>{"AskJesus | Chat"}</title>
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
        <Header
          handleArrowClick={handleArrowClick}
          handleShareClick={handleShareClick}
        />
        <div className="flex min-w-full max-w-full justify-center px-4 pt-16">
          <section className="flex w-full max-w-full flex-col gap-2 rounded-3xl">
            <AppearText>Jesus has entered the chat.</AppearText>
            {chats.map(function (chat, index) {
              const type = chat.type;
              const isStart = chat.isStart;
              const time = chat.time;
              const content = chat.content;
              const attempt = chat.attempt;

              if (type === MESSAGE_TYPE.JESUS) {
                return (
                  <JesusMessage
                    key={chat.type + chat.time + chat.content + index + attempt}
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
                  key={chat.type + chat.time + chat.content + attempt}
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
            {end && <AppearText>Jesus left the chat.</AppearText>}
            <div className="h-32 min-w-full"></div>
          </section>
        </div>
        {(isInput || isSelect) && !isError && (
          <footer className="apear max-w-kaya z-5 fixed bottom-0 flex w-full flex-row justify-between gap-2 bg-transparent bg-white bg-opacity-0 px-4 py-4">
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
                  placeholder={flow.getChunk("ask_name").text_placeholder}
                />
                <Image
                  className="cursor-pointer active:scale-75"
                  src={
                    name
                      ? "/icons/send-message-active-icon.svg"
                      : "/icons/send-message-icon.svg"
                  }
                  width={48}
                  height={48}
                  onClick={handleNameSubmit}
                  alt={"submit"}
                  priority={true}
                />
              </>
            )}
            {isInput && step === 2 && (
              <>
                <Input
                  placeholder={flow.getChunk("ask_agenda").text_placeholder}
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
                  priority={true}
                />
              </>
            )}
            {isInput && step === 8 && (
              <>
                <Input
                  placeholder={
                    flow.getChunk(`satisfaction_${satisfactionType}`)
                      .text_placeholder
                  }
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
                  priority={true}
                />
              </>
            )}
            {isInput && step === 10 && (
              <>
                <Input
                  placeholder={flow.getChunk("ask_agenda").text_placeholder}
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
                  priority={true}
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
                        handleAmenSelect(choice.choice_name);
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
                        handleReadySelect(choice.choice_name);
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
                        handleSatisfactionSelect(choice.choice_name);
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
                        handleSatisfactionSelect(choice.choice_name);
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
                        handleRetrySelect(choice.choice_name);
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
      className="hover:bg-kaya-200 active:bg-kaya-300 border-kaya-black flex h-12 w-max min-w-max cursor-pointer flex-row items-center overflow-hidden rounded-3xl border bg-white px-6 py-4"
    >
      {children}
    </div>
  );
};
