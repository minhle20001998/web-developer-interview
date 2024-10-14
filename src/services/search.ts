import { filterSearchResult, filterSearchSuggestion } from "@/mock/mock-filter";
import { SearchResultResponse, SearchSuggestionResponse } from "@/types";

const searchAPIEndpoint =
  "https://gist.githubusercontent.com/yuhong90/b5544baebde4bfe9fe2d12e8e5502cbf/raw/44deafab00fc808ed7fa0e59a8bc959d255b9785/queryResult.json";

const suggestionAPIEndpoint =
  "https://gist.githubusercontent.com/yuhong90/b5544baebde4bfe9fe2d12e8e5502cbf/raw/e026dab444155edf2f52122aefbb80347c68de86/suggestion.json";

export const fetchSearchResult = async (keyword: string) => {
  try {
    const response = await fetch(searchAPIEndpoint);

    const json: SearchResultResponse = await response.json();

    return { error: null, data: filterSearchResult(json, keyword) };
  } catch (error) {
    return { error, data: null };
  }
};

export const fetchSearchSuggestion = async (keyword: string) => {
  try {
    const response = await fetch(suggestionAPIEndpoint);

    const json: SearchSuggestionResponse = await response.json();
    return { error: null, data: filterSearchSuggestion(json, keyword) };
  } catch (error) {
    return { error, data: null };
  }
};
