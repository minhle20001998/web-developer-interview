import HighlightText from "@/components/ui/HighlightText";
import { SearchResultItem } from "@/types";
import { extractHighlightFromDocument } from "@/utils/highlight";

interface IProps {
  items: SearchResultItem[];
  total: number;
  page: number;
  pageSize: number;
}

function SearchResult(props: IProps) {
  const { items, total, page, pageSize } = props;

  const firstItemIndex = (page - 1) * pageSize + 1;
  const lastItemIndex = firstItemIndex - 1 + items.length;

  return (
    <div className="w-4/5">
      {items.length ? (
        <>
          <div className="font-semibold my-10">
            Showing {firstItemIndex} - {lastItemIndex} of {total} results
          </div>

          <div className="flex flex-col gap-12">
            {items &&
              items.map((searchItem) => (
                <div
                  className="flex flex-col gap-3"
                  key={searchItem.DocumentId}
                  data-testid={`search-item-${searchItem.DocumentId}`}
                >
                  <a
                    className="text-primary-blue font-semibold text-[22px] hover:underline visited:text-purple-700"
                    href={searchItem.DocumentURI}
                  >
                    <HighlightText
                      textFormats={extractHighlightFromDocument(
                        searchItem.DocumentTitle.Text,
                        searchItem.DocumentTitle.Highlights
                      )}
                    />
                  </a>
                  <div className="text-base font-normal">
                    <HighlightText
                      textFormats={extractHighlightFromDocument(
                        searchItem.DocumentExcerpt.Text,
                        searchItem.DocumentExcerpt.Highlights
                      )}
                    />
                  </div>
                  <a
                    className="text-sm font-normal text-[#686868] break-all"
                    href={searchItem.DocumentURI}
                  >
                    {searchItem.DocumentURI}
                  </a>
                </div>
              ))}
          </div>
        </>
      ) : (
        <div className="my-10">No results found!</div>
      )}
    </div>
  );
}

export default SearchResult;
