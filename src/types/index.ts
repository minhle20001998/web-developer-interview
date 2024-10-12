export interface Highlight {
  BeginOffset: number;
  EndOffset: number;
}

export interface SearchResultItem {
  DocumentId: string;
  DocumentTitle: {
    Text: string;
    Highlights: Highlight[];
  };
  DocumentExcerpt: {
    Text: string;
    Highlights: Highlight[];
  };
  DocumentURI: string;
}
