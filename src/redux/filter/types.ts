export type currentPageType = {
  selected: number;
};

export interface FilterSliceState {
  searchValue: string;
  categoryId: number;
  sortId: number;
  currentPage: currentPageType;
}
