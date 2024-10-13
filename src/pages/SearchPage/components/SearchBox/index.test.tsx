import SearchBox from ".";
import { act, render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

describe("SearchBox", () => {
  test("should call onSearch when the search button is clicked", async () => {
    const mockOnSearch = jest.fn();
    act(() => {
      render(<SearchBox onSearch={mockOnSearch} />);
    });

    const searchInputElement = screen.getByLabelText("search-textfield");
    const searchBtnElement = screen.getByLabelText("search-btn");

    await act(async () => {
      await userEvent.type(searchInputElement, "test");
      await userEvent.click(searchBtnElement);
    });

    expect(mockOnSearch).toHaveBeenCalledWith("test");
  });

  test("should call onSearch when the enter key is pressed", async () => {
    const mockOnSearch = jest.fn();
    act(() => {
      render(<SearchBox onSearch={mockOnSearch} />);
    });

    const searchInputElement = screen.getByLabelText("search-textfield");

    await act(async () => {
      await userEvent.type(searchInputElement, "test{enter}");
    });

    expect(mockOnSearch).toHaveBeenCalledWith("test");
  });
});
