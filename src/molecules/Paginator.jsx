import React from 'react';
import ReactPaginate from 'react-paginate';
import { useMediaQuery } from 'react-responsive';

const Paginator = (
  { totalItems, limit, onPageChange, forcePage, nextLabel, previousLabel },
  ...props
) => {
  const hasForcePage = forcePage ? forcePage - 1 : 1;
  const hasNextLabel = nextLabel || 'Next';
  const hasPrevLabel = previousLabel || 'Previous';

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
      nextLabel={hasNextLabel}
      previousLabel={hasPrevLabel}
    />
  );
};

export default Paginator;
