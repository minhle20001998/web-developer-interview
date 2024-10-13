import { Highlight } from "@/types";

interface ITextFormat {
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
