import { fetchSearchResult, fetchSearchSuggestion } from "./search";
import mockQueryResult from "@/mock/queryResult.json";
import mockSuggestion from "@/mock/suggestion.json";

describe("SearchService", () => {
  describe("fetchSearchResult", () => {
    test("should return response error=null and data=json when fetch is successful", async () => {
      // Arrange
      const keyword = "HPB";
      const response = {
        json: jest.fn().mockResolvedValue(mockQueryResult),
      };

      global.fetch = jest.fn().mockResolvedValue(response);

      // Act
      const result = await fetchSearchResult(keyword);

      // Assert
      expect(result.error).toBeNull();
      expect(result.data).toEqual(mockQueryResult);
    });

    test("should return response error=error and data=null when fetch is unsuccessful", async () => {
      // Arrange
      const keyword = "HPB";
      const error = new Error("Failed to fetch");
      global.fetch = jest.fn().mockRejectedValue(error);

      // Act
      const result = await fetchSearchResult(keyword);

      // Assert
      expect(result.error).toBe(error);
      expect(result.data).toBeNull();
    });
  });

  describe("fetchSearchSuggestion", () => {
    test("should return response with error=null and data=json when fetch is successful", async () => {
      // Arrange
      const keyword = "HPB";
      const response = {
        json: jest.fn().mockResolvedValue(mockSuggestion),
      };

      global.fetch = jest.fn().mockResolvedValue(response);

      // Act
      const result = await fetchSearchSuggestion(keyword);

      // Assert
      expect(result.error).toBeNull();
      expect(result.data).toEqual(mockSuggestion);
    });

    test("should return response with error=error and data=null when fetch is unsuccessful", async () => {
      // Arrange
      const keyword = "HPB";
      const error = new Error("Failed to fetch");
      global.fetch = jest.fn().mockRejectedValue(error);

      // Act
      const result = await fetchSearchSuggestion(keyword);

      // Assert
      expect(result.error).toBe(error);
      expect(result.data).toBeNull();
    });
  });
});
