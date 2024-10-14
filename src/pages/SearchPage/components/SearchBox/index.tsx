import SearchIcon from "@/components/icons/SearchIcon";
import CrossIcon from "@/components/icons/CrossIcon";
import { useEffect, useMemo, useState } from "react";
import { fetchSearchSuggestion } from "@/services/search";
import debounce from "lodash/debounce";
import HighlightText from "@/components/ui/HighlightText";
import { extractHighlightFromKeyword } from "@/utils/highlight";

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

  const handleSubmit = () => {
    setIsDropdownOpen(false);
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

    if (newInput.length > 2) {
      debouncedInput(newInput);
    } else {
      debouncedInput.cancel();
      setSuggestions([]);
      setIsDropdownOpen(false);
    }
  };

  const handleSearchFieldOnKeyDown = (
    e: React.KeyboardEvent<HTMLInputElement>
  ) => {
    const changeActiveSuggestionIndex = (newIndex: number) => {
      if (suggestions && suggestions.length) {
        if (newIndex >= 0 && newIndex < suggestions.length) {
          setActiveSuggestionIndex(newIndex);
        }
      }
    };

    switch (e.key) {
      case "Enter":
        if (activeSuggestionIndex >= 0) {
          setSearchInput(suggestions?.[activeSuggestionIndex] || "");
        }
        return handleSubmit();
      case "ArrowDown":
        e.preventDefault();
        return changeActiveSuggestionIndex(activeSuggestionIndex + 1);
      case "ArrowUp":
        e.preventDefault();
        return changeActiveSuggestionIndex(activeSuggestionIndex - 1);
    }
  };

  useEffect(() => {
    if (!isDropdownOpen) {
      setActiveSuggestionIndex(-1);
    }
  }, [isDropdownOpen]);

  const selectSuggestion = (suggestionIndex: number) => {
    setSearchInput(suggestions?.[suggestionIndex] || "");
    handleSubmit();
  };

  const onClickClearBtn = () => {
    setIsDropdownOpen(false);
    setSearchInput("");
  };

  return (
    <div
      className={
        "flex rounded-lg border-2 focus-within:border-primary-blue" +
        (isDropdownOpen ? " rounded-bl-none" : "")
      }
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
          onFocus={() => setIsDropdownOpen(true)}
          aria-label="search-textfield"
        />
        <button
          className={
            "absolute top-2/4 right-2 -translate-y-2/4" +
            (searchInput.length ? "" : " hidden")
          }
          onClick={onClickClearBtn}
        >
          <CrossIcon />
        </button>
        {suggestions && isDropdownOpen && (
          <ul
            className="absolute w-full py-3 rounded-b-lg shadow-general border-x border-b bg-white flex flex-col translate-y-1"
            aria-label="suggestion-dropdown"
          >
            {suggestions.map((suggestion, index) => (
              <li
                key={index}
                className={
                  "cursor-default p-2 px-5 rounded-sm" +
                  (activeSuggestionIndex === index ? " bg-slate-100" : "")
                }
                onClick={() => selectSuggestion(index)}
              >
                <HighlightText
                  textFormats={extractHighlightFromKeyword(
                    suggestion,
                    searchInput
                  )}
                />
              </li>
            ))}
          </ul>
        )}
      </div>
      <button
        type="submit"
        className="bg-primary-blue flex justify-center items-center gap-2 text-white py-2 px-5 rounded-md"
        aria-label="search-btn"
        onClick={handleSubmit}
      >
        <div>
          <SearchIcon />
        </div>
        <div className="hidden sm:block">Search</div>
      </button>
    </div>
  );
}

export default SearchBox;
