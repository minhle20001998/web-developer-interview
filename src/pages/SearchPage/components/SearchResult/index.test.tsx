import mockQueryResult from "@/mock/queryResult.json";
import { act, render, screen } from "@testing-library/react";
import SearchResult from ".";

describe("SearchResult", () => {
  const items = mockQueryResult.ResultItems;
  const total = mockQueryResult.TotalNumberOfResults;
  const page = mockQueryResult.Page;
  const pageSize = mockQueryResult.PageSize;

  test("renders the correct range of items based on page and pageSize", () => {
    act(() => {
      render(
        <SearchResult
          items={items}
          total={total}
          page={page}
          pageSize={pageSize}
        />
      );
    });

    const firstIndex = (page - 1) * pageSize + 1;
    const lastIndex = (page - 1) * pageSize + items.length;
    // Check if the correct item range is displayed on the page
    expect(
      screen.getByText(
        new RegExp(
          `Showing ${firstIndex} - ${lastIndex} of ${total} results`,
          "i"
        )
      )
    ).toBeInTheDocument();
  });

  test("renders the list of search results and correct URLs for search result links", () => {
    act(() => {
      render(
        <SearchResult
          items={items}
          total={total}
          page={page}
          pageSize={pageSize}
        />
      );
    });

    items.forEach((searchItem) => {
      const itemElement = screen.getByTestId(
        `search-item-${searchItem.DocumentId}`
      );
      expect(itemElement).toBeInTheDocument();
      // check title, excerpt, and uri elements
      const titleElement = itemElement.firstChild;
      const excerptElement = titleElement?.nextSibling;
      const uriElement = excerptElement?.nextSibling;

      expect(titleElement?.textContent).toBe(searchItem.DocumentTitle.Text);
      expect(excerptElement?.textContent).toBe(searchItem.DocumentExcerpt.Text);
      expect(uriElement?.textContent).toBe(searchItem.DocumentURI);
      expect(uriElement).toHaveAttribute("href", searchItem.DocumentURI);
    });
  });

  test('renders "No results found!" when result items are empty', () => {
    act(() => {
      render(<SearchResult items={[]} total={0} page={1} pageSize={10} />);
    });

    expect(screen.getByText("No results found!")).toBeInTheDocument();
  });
});
