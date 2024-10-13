import mockQueryResult from "@/../../queryResult.json";
import { act, render, screen } from "@testing-library/react";
import SearchResult from ".";

test("renders the correct range of items based on page and pageSize", () => {
  const items = mockQueryResult.ResultItems;
  const total = mockQueryResult.TotalNumberOfResults;
  const page = mockQueryResult.Page;
  const pageSize = mockQueryResult.PageSize;

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
  // Check if the correct item range is displayed (e.g., "Showing 1-2 of 50 results")
  expect(
    screen.getByText(
      new RegExp(
        `Showing ${firstIndex} - ${lastIndex} of ${total} results`,
        "i"
      )
    )
  ).toBeInTheDocument();
});

test("");
