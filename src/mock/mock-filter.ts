import { SearchResultResponse, SearchSuggestionResponse } from "@/types";

export const filterSearchResult = (
  result: SearchResultResponse,
  keyword: string
) => {
  result.ResultItems = result.ResultItems.filter((resultItem) =>
    resultItem.DocumentTitle.Text.toLowerCase().includes(keyword.toLowerCase())
  );
  result.TotalNumberOfResults = result.ResultItems.length;
  return result;
};

export const filterSearchSuggestion = (
  result: SearchSuggestionResponse,
  keyword: string
) => {
  result.suggestions = result.suggestions.filter((suggestion) =>
    suggestion.includes(keyword)
  );
  return result;
};
