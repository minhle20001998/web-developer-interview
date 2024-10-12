import SearchBox from "./components/SearchBox";
import SearchResult from "./components/SearchResult";

function SearchPage() {
  return (
    <>
      <div className="shadow-general">
        <div className="py-10 w-4/5 mx-auto">
          <SearchBox />
        </div>
      </div>
      <div className="pb-20 w-4/5 mx-auto">
        <SearchResult />
      </div>
    </>
  );
}

export default SearchPage;
