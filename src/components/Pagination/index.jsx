import React from 'react';
import ReactPaginate from 'react-paginate';
import { useDispatch } from 'react-redux';
import { setCurrentPage } from '../../redux/slices/filterSlice';

import styles from './Pagination.module.scss';

const Pagination = ({ totalPages, setValue, currentPage }) => {
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
      forcePage={currentPage.selected}
    />
  );
};

export default Pagination;
