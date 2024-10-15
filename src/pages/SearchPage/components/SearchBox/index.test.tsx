import SearchBox from ".";
import { act, render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import suggestion from "@/mock/suggestion.json";
import * as searchService from "@/services/search";

describe("SearchBox", () => {
  describe("#1: Perform search", () => {
    test("should call onSearch when the search button is clicked", async () => {
      const mockOnSearch = jest.fn();
      act(() => {
        render(<SearchBox onSearch={mockOnSearch} />);
      });

      const searchInputElement: HTMLInputElement =
        screen.getByLabelText("search-textfield");
      const searchBtnElement = screen.getByLabelText("search-btn");

      await act(async () => {
        await userEvent.type(searchInputElement, "test");
      });
      expect(searchInputElement.value).toBe("test");

      await act(async () => {
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

      jest
        .spyOn(searchService, "fetchSearchSuggestion")
        .mockResolvedValue({ error: null, data: suggestion });

      const searchInputElement = screen.getByLabelText("search-textfield");

      await act(async () => {
        await userEvent.type(searchInputElement, "test");
      });

      const suggestionDropdown = await screen.findByRole("list");
      expect(suggestionDropdown).toBeInTheDocument();
    });

    test("should not show suggestion dropdown when user types <= 2 characters in search bar", async () => {
      // Arrange
      act(() => {
        render(<SearchBox onSearch={jest.fn()} />);
      });

      const searchInputElement = screen.getByLabelText("search-textfield");

      await act(async () => {
        await userEvent.type(searchInputElement, "ch");
      });

      const suggestionDropdown = screen.queryByRole("list");
      expect(suggestionDropdown).not.toBeInTheDocument();
    });
  });

  describe("#2c: 'X' Button in SearchBar", () => {
    test("input value into text field should display clear button", async () => {
      act(() => {
        render(<SearchBox onSearch={jest.fn()} />);
      });

      const searchInputElement = screen.getByLabelText("search-textfield");

      const testInput = "c";
      await act(async () => {
        await userEvent.type(searchInputElement, testInput);
      });

      const searchClearBtn = screen.queryByLabelText("search-clear-btn");

      expect(searchClearBtn).toBeInTheDocument();
    });

    test("load and display search textfield with no clear button", async () => {
      act(() => {
        render(<SearchBox onSearch={jest.fn()} />);
      });

      const searchInputElement: HTMLInputElement =
        screen.getByLabelText("search-textfield");

      expect(searchInputElement.value).toBeFalsy();

      const clearBtnElement = screen.queryByLabelText("search-clear-btn");

      expect(clearBtnElement).not.toBeInTheDocument();
    });
  });

  describe("#2d: Click 'X' Button in SearchBar", () => {
    test("When 'X' is clicked, should close suggestion dropdown, clear searchbar textfield but remain focused and 'X' disappears", async () => {
      act(() => {
        render(<SearchBox onSearch={jest.fn()} />);
      });

      const searchInputElement: HTMLInputElement =
        screen.getByLabelText("search-textfield");

      jest
        .spyOn(searchService, "fetchSearchSuggestion")
        .mockResolvedValue({ error: null, data: suggestion });

      const testInput = "cat";
      await act(async () => {
        await userEvent.type(searchInputElement, testInput);
      });

      const searchClearBtn = await screen.findByLabelText("search-clear-btn");

      const suggestionDropdown = await screen.findByRole("list");
      expect(suggestionDropdown).toBeInTheDocument();

      await act(async () => {
        await userEvent.click(searchClearBtn);
      });

      expect(suggestionDropdown).not.toBeInTheDocument();
      expect(searchInputElement.value).toBeFalsy();
      expect(searchInputElement).toHaveFocus();
      expect(searchClearBtn).not.toBeInTheDocument();
    });
  });

  describe("#2b: Select Suggestion", () => {
    test("When onSearchMockup or down keyboard btn and press enter on a suggestion item, suggestion dropdown disappears, selected search term in search bar, and fetch search result", async () => {
      const onSearchMock = jest.fn();

      act(() => {
        render(<SearchBox onSearch={onSearchMock} />);
      });
      jest
        .spyOn(searchService, "fetchSearchSuggestion")
        .mockResolvedValue({ error: null, data: suggestion });

      const searchInputElement: HTMLInputElement =
        screen.getByLabelText("search-textfield");

      const testInput = "cat";
      await act(async () => {
        await userEvent.type(searchInputElement, testInput);
      });

      const suggestionDropdown = await screen.findByRole("list");

      await act(async () => {
        await userEvent.type(searchInputElement, "{arrowdown}");
        await userEvent.type(searchInputElement, "{arrowdown}");
        await userEvent.type(searchInputElement, "{arrowup}");
        await userEvent.type(searchInputElement, "{enter}");
      });

      await waitFor(() => {
        expect(onSearchMock).toHaveBeenCalled();
        expect(suggestionDropdown).not.toBeInTheDocument();
      });
    });
  });
});
