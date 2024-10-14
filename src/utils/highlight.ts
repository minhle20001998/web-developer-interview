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

export const extractHighlightFromKeyword = (
  text: string,
  keyword: string
): ITextFormat[] => {
  const trimmedKeyword = keyword.trim();

  const result: ITextFormat[] = [];

  let lastIndex = 0;
  for (let i = 0; i < text.length; i++) {
    let matchKeyword = true;

    for (let j = 0; j < trimmedKeyword.length; j++) {
      if (text[i + j] !== trimmedKeyword[j]) {
        matchKeyword = false;
        break;
      }
    }

    if (matchKeyword) {
      result.push(
        {
          text: text.slice(lastIndex, i),
          type: "normal",
        },
        {
          text: text.slice(i, i + trimmedKeyword.length),
          type: "bold",
        }
      );
      lastIndex = i + trimmedKeyword.length;
    }
  }

  if (lastIndex < text.length) {
    result.push({
      text: text.slice(lastIndex, text.length),
      type: "normal",
    });
  }

  return result;
};
