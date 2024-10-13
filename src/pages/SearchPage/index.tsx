import { SearchResultResponse } from "@/types";
import SearchBox from "./components/SearchBox";
import SearchResult from "./components/SearchResult";
import { useState } from "react";
import { fetchSearchResult } from "@/services/search";

function SearchPage() {
  const [searchResult, setSearchResult] = useState<SearchResultResponse>();
  const [isSearched, setIsSearched] = useState<boolean>(false);

  const onSearch = (keyword: string) => {
    fetchSearchResult(keyword).then(({ data }) => {
      if (data) setSearchResult(data);
      setIsSearched(true);
    });
  };

  return (
    <>
      <div className="shadow-general">
        <div className="py-10 w-4/5 mx-auto">
          <SearchBox onSearch={onSearch} />
        </div>
      </div>
      <div className="pb-20 w-4/5 mx-auto">
        {isSearched && (
          <SearchResult
            items={searchResult?.ResultItems}
            total={searchResult?.TotalNumberOfResults}
          />
        )}
      </div>
    </>
  );
}

export default SearchPage;
