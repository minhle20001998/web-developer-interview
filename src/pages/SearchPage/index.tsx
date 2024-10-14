import { SearchResultResponse } from "@/types";
import SearchBox from "./components/SearchBox";
import SearchResult from "./components/SearchResult";
import { useState } from "react";
import { fetchSearchResult } from "@/services/search";
import SearchPageBanner from "./components/SearchPageBanner";

function SearchPage() {
  const [searchResult, setSearchResult] = useState<SearchResultResponse>();

  const onSearch = (keyword: string) => {
    console.log('keyword ', keyword);
    fetchSearchResult(keyword).then(({ data }) => {
      if (data) setSearchResult(data);
    });
  };

  return (
    <>
      <div className="shadow-general sticky top-0 bg-white">
        <SearchPageBanner />
        <div className="py-10 w-4/5 mx-auto">
          <SearchBox onSearch={onSearch} />
        </div>
      </div>
      <div className="pb-20 w-4/5 mx-auto">
        {searchResult && (
          <SearchResult
            items={searchResult.ResultItems}
            total={searchResult.TotalNumberOfResults}
            page={searchResult.Page}
            pageSize={searchResult.PageSize}
          />
        )}
      </div>
    </>
  );
}

export default SearchPage;
