import React from 'react';
import ReactPaginate from 'react-paginate';
import { useMediaQuery } from 'react-responsive';

const Paginator = (
  { totalItems, limit, onPageChange, forcePage },
  ...props
) => {
  const hasForcePage = forcePage ? forcePage - 1 : 1;
  const isMobile = useMediaQuery({ query: '(max-width: 576px)' });

  return (
    <ReactPaginate
      {...props}
      disabledClassName='paginator-disable'
      containerClassName='paginator'
      activeClassName='paginator-active-page'
      pageCount={Math.ceil(totalItems / limit)}
      breakLabel={''}
      marginPagesDisplayed={0}
      pageRangeDisplayed={isMobile ? 5 : 9}
      onPageChange={onPageChange}
      forcePage={hasForcePage}
    />
  );
};

export default Paginator;
