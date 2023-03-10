const MESSAGE_TYPE = {
  JESUS: "JESUS",
  USER: "USER",
};

const INPUT_DEFAULT = {
  spellCheck: false,
  autoComplete: "off",
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

const MESSAGE_GAP = 1000;

const REGEX = {
  VERSE:
    /“(.*)\”([\s\-]*)?(?<bookName>[\w]+)[\s]*(?<chapter>[1-9]+)\:?(?<verseStart>[1-9]+)-?(?<verseEnd>[1-9]+)?$/,
};

Object.freeze([
  MESSAGE_TYPE,
  INPUT_DEFAULT,
  PRAYER_TYPE,
  READY_TYPE,
  SATISFACTION_TYPE,
  MESSAGE_GAP,
  REGEX,
]);

export {
  MESSAGE_TYPE,
  INPUT_DEFAULT,
  PRAYER_TYPE,
  READY_TYPE,
  SATISFACTION_TYPE,
  MESSAGE_GAP,
  REGEX,
};
