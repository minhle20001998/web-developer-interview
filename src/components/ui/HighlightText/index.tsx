import { Highlight } from "@/types";
import { extractHighlightFromDocument } from "@/utils/highlight";

interface IProps {
  text: string;
  highlights: Highlight[];
}

function HighlightText(props: IProps) {
  const { text, highlights } = props;

  return (
    <>
      {extractHighlightFromDocument(text, highlights).map(
        ({ text, type }, index) => (
          <span key={index} className={type === "bold" ? "font-bold" : ""}>
            {text}
          </span>
        )
      )}
    </>
  );
}

export default HighlightText;
