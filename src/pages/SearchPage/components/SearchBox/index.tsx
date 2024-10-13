import SearchIcon from "@/components/icons/SearchIcon";
import CrossIcon from "@/components/icons/CrossIcon";
import { useEffect, useMemo, useState } from "react";
import { fetchSearchSuggestion } from "@/services/search";
import debounce from "lodash/debounce";

interface IProps {
  onSearch: (keyword: string) => void;
}

function SearchBox(props: IProps) {
  const { onSearch } = props;
  const [suggestions, setSuggestions] = useState<string[]>();
  const [searchInput, setSearchInput] = useState<string>();
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (searchInput) {
      onSearch(searchInput);
    }
  };

  const debouncedInput = useMemo(
    () =>
      debounce((searchInput) => {
        fetchSearchSuggestion(searchInput).then(({ error, data }) => {
          if (error) {
            console.error(error);
          } else if (data) {
            setSuggestions(data.suggestions);
            if (data.suggestions.length) {
              setIsDropdownOpen(true);
            }
          }
        });
      }, 300),
    []
  );

  useEffect(() => {
    if (searchInput && searchInput?.length > 2) {
      debouncedInput(searchInput);
    } else {
      debouncedInput.cancel();
      if (suggestions?.length) setSuggestions([]);
      if (isDropdownOpen) setIsDropdownOpen(false);
    }
  }, [searchInput, debouncedInput, suggestions?.length, isDropdownOpen]);

  return (
    <form
      className={
        "flex rounded-lg border-2 focus-within:border-primary-blue" +
        (isDropdownOpen ? " rounded-bl-none" : "")
      }
      onSubmit={handleSubmit}
    >
      <div className="flex-grow relative">
        <input
          type="text"
          className={
            "w-full h-full rounded-lg focus:outline-none focus:ring-0 pl-4 pr-10" +
            (isDropdownOpen ? " rounded-b-none" : "")
          }
          onChange={(e) => setSearchInput(e.target.value)}
          aria-label="search-textfield"
        />
        <div className="absolute top-2/4 right-2 -translate-y-2/4">
          <CrossIcon />
        </div>
        {suggestions && isDropdownOpen && (
          <div className="absolute w-full p-5 rounded-b-lg shadow-general border-x border-b translate-z bg-white flex flex-col gap-[10px] -z-10">
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
