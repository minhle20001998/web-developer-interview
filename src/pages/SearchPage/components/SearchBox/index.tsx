import SearchIcon from "@components/icons/SearchIcon";
import CrossIcon from "@/components/icons/CrossIcon";
import { useEffect, useState } from "react";
import suggestion from "../../../../../suggestion.json";

function SearchBox() {
  const [suggestions, setSuggestions] = useState<string[]>();

  useEffect(() => {
    setSuggestions(suggestion.suggestions);
  }, []);

  return (
    <div className="flex">
      <div className="flex-grow relative">
        <input
          type="text"
          className="w-full h-full border rounded-lg focus:border-primary-blue focus:rounded-b-none focus:outline-none focus:ring-0 pl-4 pr-10"
        />
        <div className="absolute top-2/4 right-2 -translate-y-2/4">
          <CrossIcon />
        </div>
        {suggestions && (
          <div className="absolute w-full p-5 rounded-b-lg shadow-general border border-t-0 bg-white flex flex-col gap-[10px]">
            {suggestions.map((suggestion) => (
              <div>{suggestion}</div>
            ))}
          </div>
        )}
      </div>
      <button className="bg-primary-blue flex justify-center items-center gap-2 text-white py-2 px-5 rounded-lg">
        <SearchIcon />
        Search
      </button>
    </div>
  );
}

export default SearchBox;
