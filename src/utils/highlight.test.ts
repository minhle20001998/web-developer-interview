import { Highlight } from "@/types";
import { extractHighlightFromDocument } from "./highlight";

describe("HighlightUtil", () => {
  test("should return full text with type=normal if no highlights are provided", () => {
    // Arrange
    const text =
      "HPB Introduces BMI-for-Age Charts to Monitor Physical Growth and Development in Children and Youth";
    const noHighlights: Highlight[] = [];

    // Act
    const textArrs = extractHighlightFromDocument(text, noHighlights);

    // Assert
    expect(textArrs).toHaveLength(1);
    expect(textArrs[0].text).toBe(text);
    expect(textArrs[0].type).toBe("normal");
  });

  test("should return an array of subtext with either type=normal or type=bold", () => {
    // Arrange
    const text = "Choose a Child Care Centre";
    const highlights: Highlight[] = [
      {
        BeginOffset: 9,
        EndOffset: 14,
      },
    ];

    // Act
    const textArrs = extractHighlightFromDocument(text, highlights);

    // Assert
    expect(textArrs).toHaveLength(3);
    expect(textArrs[0].text).toBe("Choose a ");
    expect(textArrs[0].type).toBe("normal");
    expect(textArrs[1].text).toBe("Child");
    expect(textArrs[1].type).toBe("bold");
    expect(textArrs[2].text).toBe(" Care Centre");
    expect(textArrs[2].type).toBe("normal");
  });
});
