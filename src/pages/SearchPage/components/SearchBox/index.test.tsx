import SearchBox from ".";
import { act, render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import suggestion from "@/mock/suggestion.json";

describe("SearchBox", () => {
  describe("#1: Perform search", () => {
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

  describe("#2a: Typeahead Suggestion Dropdown", () => {
    test("should show suggestion dropdown when user types > 2 characters in search bar", async () => {
      // Arrange
      act(() => {
        render(<SearchBox onSearch={jest.fn()} />);
      });

      const response = {
        json: jest.fn().mockResolvedValue(suggestion),
      };

      global.fetch = jest.fn().mockResolvedValue(response);

      const searchInputElement = screen.getByLabelText("search-textfield");

      await act(async () => {
        await userEvent.type(searchInputElement, "test");
      });

      const suggestionDropdown = screen.getByLabelText("suggestion-dropdown");
      expect(suggestionDropdown).toBeInTheDocument();
    });
  });
});
