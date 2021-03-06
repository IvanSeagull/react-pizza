import React from 'react';
import ReactPaginate from 'react-paginate';

import styles from './Pagination.module.scss';

type PaginationProps = {
  totalPages: number;
  setValue: (e: any) => void;
  currentPage: {
    selected: number;
  };
};

export const Pagination: React.FC<PaginationProps> = ({ totalPages, setValue, currentPage }) => (
  <ReactPaginate
    className={styles.root}
    breakLabel="..."
    nextLabel=">"
    previousLabel="<"
    onPageChange={(e) => setValue(e)}
    pageRangeDisplayed={5}
    pageCount={totalPages}
    forcePage={currentPage.selected}
  />
);
