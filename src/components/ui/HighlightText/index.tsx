import { Highlight } from "@/types";

interface IProps {
  text: string;
  highlights: Highlight[];
}

function HighlightText(props: IProps) {
  const { text, highlights } = props;

  const hightlightText = () => {
    const highlighted: JSX.Element[] = [];
    let lastIndex = 0;
    highlights.forEach(({ BeginOffset, EndOffset }) => {
      if (lastIndex < BeginOffset) {
        highlighted.push(<span>{text.slice(lastIndex, BeginOffset)}</span>);
      }

      highlighted.push(
        <span className="font-bold">{text.slice(BeginOffset, EndOffset)}</span>
      );

      lastIndex = EndOffset;
    });

    if (lastIndex < text.length - 1) {
      highlighted.push(<span>{text.slice(lastIndex, text.length)}</span>);
    }
    return highlighted;
  };

  
  return <>{highlights.length ? hightlightText() : text}</>;
}

export default HighlightText;
