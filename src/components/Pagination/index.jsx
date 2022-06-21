import React from 'react';
import ReactPaginate from 'react-paginate';

import styles from './Pagination.module.scss';

const Pagination = ({ totalPages, setValue }) => {
  return (
    <ReactPaginate
      className={styles.root}
      breakLabel="..."
      nextLabel=">"
      previousLabel="<"
      onPageChange={(e) => setValue(e)}
      pageRangeDisplayed={5}
      pageCount={totalPages}
      renderOnZeroPageCount={null}
    />
  );
};

export default Pagination;
