import { SearchResultResponse } from "@/types";

export const fetchSearchResult = async (_keyword: string) => {
  //TODO Try catch, validate json response
  try {
    const response = await fetch(
      "https://gist.githubusercontent.com/yuhong90/b5544baebde4bfe9fe2d12e8e5502cbf/raw/44deafab00fc808ed7fa0e59a8bc959d255b9785/queryResult.json"
    );

    const json: SearchResultResponse = await response.json();
    return { error: null, data: json };
  } catch (error) {
    return { error, data: null };
  }
};
