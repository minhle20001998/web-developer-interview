import { useEffect, useState } from "react";
import queryResult from "../../../../../queryResult.json";
import { SearchResultItem } from "@/types";

function SearchResult() {
  const [searchResult, setSearchResult] = useState<SearchResultItem[]>([]);

  useEffect(() => {
    setSearchResult(queryResult.ResultItems);
  }, []);

  return (
    <div className="w-4/5">
      <div className="font-semibold my-10">Showing 1-10 of 300 results</div>

      <div className="flex flex-col gap-12">
        {searchResult.length &&
          searchResult.map((searchItem) => (
            <div className="flex flex-col gap-3">
              <div className="text-primary-blue font-semibold text-[22px]">{searchItem.DocumentTitle.Text}</div>
              <div className="text-base font-normal">{searchItem.DocumentExcerpt.Text}</div>
              <div className="text-sm font-normal text-[#686868]">{searchItem.DocumentURI}</div>
            </div>
          ))}
      </div>
    </div>
  );
}

export default SearchResult;
