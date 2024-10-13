import SearchIcon from "@/components/icons/SearchIcon";
import CrossIcon from "@/components/icons/CrossIcon";
import { useMemo, useState } from "react";
import { fetchSearchSuggestion } from "@/services/search";
import debounce from "lodash/debounce";

interface IProps {
  onSearch: (keyword: string) => void;
}

function SearchBox(props: IProps) {
  const { onSearch } = props;
  const [suggestions, setSuggestions] = useState<string[]>();
  const [searchInput, setSearchInput] = useState<string>("");
  const [isDropdownOpen, setIsDropdownOpen] = useState<boolean>(false);
  const [activeSuggestionIndex, setActiveSuggestionIndex] =
    useState<number>(-1);
  const [selectedSuggestionIndex, setSelectedSuggestionIndex] =
    useState<number>();
  const [isClearBtnVisible, setIsClearBtnVisible] = useState<boolean>(false);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    setIsDropdownOpen(false);
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

  const handleInputChange = (newInput: string) => {
    setSearchInput(newInput);
    if (newInput.length > 0) {
      setIsClearBtnVisible(true);
    } else {
      setIsClearBtnVisible(false);
    }

    if (newInput.length > 2) {
      debouncedInput(newInput);
    } else {
      debouncedInput.cancel();
      setSuggestions([]);
      setIsDropdownOpen(false);
    }
  };

  const changeActiveSuggestionIndex = (newIndex: number) => {
    if (suggestions && suggestions.length) {
      if (newIndex >= 0 && newIndex < suggestions.length) {
        setActiveSuggestionIndex(newIndex);
      }
    }
  };

  const handleSearchFieldOnKeyDown = (
    e: React.KeyboardEvent<HTMLInputElement>
  ) => {
    if (e.key === "ArrowDown") {
      console.log("activeIndex ", activeSuggestionIndex);
      changeActiveSuggestionIndex(activeSuggestionIndex + 1);
    }

    if (e.key === "ArrowUp") {
      changeActiveSuggestionIndex(activeSuggestionIndex - 1);
    }
  };

  const selectSuggestion = (suggestionIndex: number) => {
    setSearchInput(suggestions?.[suggestionIndex] || "");
    setSelectedSuggestionIndex(suggestionIndex);
    setIsDropdownOpen(false);
  };

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
          value={searchInput}
          onChange={(e) => handleInputChange(e.target.value)}
          onKeyDown={handleSearchFieldOnKeyDown}
          aria-label="search-textfield"
        />
        <button
          className={
            "absolute top-2/4 right-2 -translate-y-2/4" +
            (isClearBtnVisible ? "" : " hidden")
          }
        >
          <CrossIcon />
        </button>
        {suggestions && isDropdownOpen && (
          <ul className="absolute w-full py-3 rounded-b-lg shadow-general border-x border-b translate-z bg-white flex flex-col -z-10">
            {suggestions.map((suggestion, index) => (
              <li
                key={index}
                className={
                  "cursor-default p-2 px-5 rounded-sm" +
                  (activeSuggestionIndex === index ? " bg-slate-100" : "")
                }
                onClick={() => selectSuggestion(index)}
              >
                {suggestion}
              </li>
            ))}
          </ul>
        )}
      </div>
      <button
        className="bg-primary-blue flex justify-center items-center gap-2 text-white py-2 px-5 rounded-md"
        aria-label="search-btn"
      >
        <SearchIcon />
        Search
      </button>
    </form>
  );
}

export default SearchBox;
