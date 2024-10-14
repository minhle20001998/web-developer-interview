import { SearchResultResponse } from "@/types";
import SearchBox from "./components/SearchBox";
import SearchResult from "./components/SearchResult";
import { useState } from "react";
import { fetchSearchResult } from "@/services/search";
import LogoIcon from "@/components/icons/LogoIcon";

function SearchPage() {
  const [searchResult, setSearchResult] = useState<SearchResultResponse>();

  const onSearch = (keyword: string) => {
    fetchSearchResult(keyword).then(({ data }) => {
      if (data) setSearchResult(data);
    });
  };

  return (
    <>
      <div className="shadow-general sticky top-0 bg-white">
        <div className="bg-[#F0F0F0]">
          <div className="flex w-4/5 mx-auto items-center gap-2 text-xs py-2 text-[#5B5B5B]">
            <LogoIcon />
            <div>
              An Official Website of the{" "}
              <span className="font-semibold">Singapore Government</span>
            </div>
          </div>
        </div>
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
