import SearchBox from "./components/search-box/SearchBox";
import SearchResult from "./components/search-result/SearchResult";

function SearchPage() {
  return (
    <>
      <div className="shadow-general">
        <div className="py-10 w-4/5 mx-auto">
          <SearchBox />
        </div>
      </div>
      <div className="py-10 w-4/5 mx-auto">
        <SearchResult />
      </div>
    </>
  );
}

export default SearchPage;
