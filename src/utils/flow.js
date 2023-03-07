import { counselingFlowData } from "../constants/flow";
import _ from "lodash";

export class CounselingFlow {
  getChunk(chunkName) {
    return counselingFlowData.chunks.find(
      (chunk) => chunk.chunk_name === chunkName
    );
  }

  getChunkMessages(chunkName) {
    return counselingFlowData.messages
      .filter((message) => message.chunk_name === chunkName)
      .sort((message1, message2) =>
        message1.message_order > message2.message_order ? 1 : -1
      );
  }

  getMessageLines(messageCode) {
    return counselingFlowData.lines.filter(
      (line) => line.message_code === messageCode
    );
  }

  getRandomLine(messageCode) {
    const lines = this.getMessageLines(messageCode);

    const no = _.random(1, lines.length);

    return lines[no];
  }

  getChoices(responseName) {
    return counselingFlowData.choices.filter(
      (choice) => choice.response_name === responseName
    );
  }

  replaceParams(text = "", parameters) {
    const replacedText = Object.entries(parameters).reduce(([key, value]) => {
      const token = `{${key}}`;

      return text.replace(token, value);
    }, "");

    return replacedText;
  }
}

export function getChunk(chunkName) {
  counselingFlowData.chunks.find((chunk) => chunk.name === chunkName);
}
