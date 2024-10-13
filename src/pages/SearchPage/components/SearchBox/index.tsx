import SearchIcon from "@/components/icons/SearchIcon";
import CrossIcon from "@/components/icons/CrossIcon";
import { useState } from "react";

interface IProps {
  onSearch: (keyword: string) => void;
}

function SearchBox(props: IProps) {
  const { onSearch } = props;
  const [suggestions] = useState<string[]>();
  const [searchInput, setSearchInput] = useState<string>();

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (searchInput) {
      onSearch(searchInput);
    }
  };

  return (
    <form
      className={
        "flex rounded-lg border focus-within:border-primary-blue focus-within:rounded-bl-none" 
      }
      onSubmit={handleSubmit}
    >
      <div className="flex-grow relative">
        <input
          type="text"
          className="w-full h-full rounded-lg  focus:rounded-b-none focus:outline-none focus:ring-0 pl-4 pr-10"
          onChange={(e) => setSearchInput(e.target.value)}
          aria-label="search-textfield"
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
      <button
        className="bg-primary-blue flex justify-center items-center gap-2 text-white py-2 px-5 rounded-lg"
        aria-label="search-btn"
      >
        <SearchIcon />
        Search
      </button>
    </form>
  );
}

export default SearchBox;
