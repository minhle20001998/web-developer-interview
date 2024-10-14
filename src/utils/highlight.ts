import { Highlight } from "@/types";

export interface ITextFormat {
  text: string;
  type: "bold" | "normal";
}

export const extractHighlightFromDocument = (
  text: string,
  highlights: Highlight[]
): ITextFormat[] => {
  if (!highlights || highlights.length === 0) return [{ text, type: "normal" }];

  const result: ITextFormat[] = [];
  let currentIndex = 0;

  highlights.forEach(({ BeginOffset, EndOffset }) => {
    if (currentIndex < BeginOffset) {
      result.push({
        text: text.slice(currentIndex, BeginOffset),
        type: "normal",
      });
    }

    result.push({
      text: text.slice(BeginOffset, EndOffset),
      type: "bold",
    });

    currentIndex = EndOffset;
  });

  if (currentIndex < text.length - 1) {
    result.push({
      text: text.slice(currentIndex, text.length),
      type: "normal",
    });
  }

  return result;
};

export const extractHighlightByKeyword = (
  text: string,
  keyword: string
): ITextFormat[] => {
  const trimmedKeyword = keyword.trim();
  const result: ITextFormat[] = [];

  let index = 0;

  while (index < text.length) {
    const indexOfKeyword = text.indexOf(trimmedKeyword, index);

    if (indexOfKeyword === -1) {
      if (index < text.length) {
        result.push({
          text: text.slice(index),
          type: "normal",
        });
      }
      break;
    }

    if (index < indexOfKeyword) {
      result.push({
        text: text.slice(index, indexOfKeyword),
        type: "normal",
      });
    }

    result.push({
      text: text.slice(indexOfKeyword, indexOfKeyword + trimmedKeyword.length),
      type: "bold",
    });

    index = indexOfKeyword + trimmedKeyword.length;
  }

  return result;
};
