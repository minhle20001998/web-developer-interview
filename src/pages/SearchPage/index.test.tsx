import { render, act, screen, waitFor } from "@testing-library/react";
import SearchPage from ".";
import * as searchService from "@/services/search";
import mockSearchResult from "@/mock/queryResult.json";
import userEvent from "@testing-library/user-event";

describe("SearchPage", () => {
  test("should call searchApi when search keyword is updated", async () => {
    act(() => {
      render(<SearchPage />);
    });
    const fetchSearchResultSpy = jest
      .spyOn(searchService, "fetchSearchResult")
      .mockResolvedValue({ error: null, data: mockSearchResult });

    const searchInputElement = screen.getByLabelText("search-textfield");

    const testInput = "c";
    const searchBtnElement = screen.getByLabelText("search-btn");

    await userEvent.type(searchInputElement, testInput);
    await userEvent.click(searchBtnElement);

    await waitFor(() => {
      expect(fetchSearchResultSpy).toHaveBeenCalled();
    });
  });

  test("should display network error when API call fails", async () => {
    act(() => {
      render(<SearchPage />);
    });
    const fetchSearchResultSpy = jest
      .spyOn(searchService, "fetchSearchResult")
      .mockResolvedValue({ error: new Error(), data: null });

    const searchInputElement = screen.getByLabelText("search-textfield");
    const searchBtnElement = screen.getByLabelText("search-btn");

    const testInput = "c";
    await userEvent.type(searchInputElement, testInput);
    await userEvent.click(searchBtnElement);

    await waitFor(async () => {
      expect(fetchSearchResultSpy).toHaveBeenCalled();
      expect(
        await screen.findByText("Network error. Please try again later!")
      ).toBeInTheDocument();
    });
  });
});
