// import queryResult from "../../../../../queryResult.json";
import HighlightText from "@/components/ui/HighlightText";
import { SearchResultItem } from "@/types";

interface IProps {
  items?: SearchResultItem[];
  total?: number;
}

function SearchResult(props: IProps) {
  const { items, total } = props;

  return (
    <>
      {items ? (
        <div className="w-4/5">
          <div className="font-semibold my-10">
            Showing 1-10 of {total} results
          </div>

          <div className="flex flex-col gap-12">
            {items &&
              items.map((searchItem) => (
                <div
                  className="flex flex-col gap-3"
                  key={searchItem.DocumentId}
                >
                  <div className="text-primary-blue font-semibold text-[22px]">
                    <HighlightText
                      text={searchItem.DocumentTitle.Text}
                      highlights={searchItem.DocumentTitle.Highlights}
                    />
                  </div>
                  <div className="text-base font-normal">
                    <HighlightText
                      text={searchItem.DocumentExcerpt.Text}
                      highlights={searchItem.DocumentExcerpt.Highlights}
                    />
                  </div>
                  <div className="text-sm font-normal text-[#686868]">
                    {searchItem.DocumentURI}
                  </div>
                </div>
              ))}
          </div>
        </div>
      ) : (
        <div>Loading...</div>
      )}
    </>
  );
}

export default SearchResult;
