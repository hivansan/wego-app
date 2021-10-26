import React, { useState } from 'react';
import DataTable from 'react-data-table-component';
import Paginator from '../molecules/Paginator';

import { MdNavigateNext, MdNavigateBefore } from 'react-icons/md';

const CollectionsTable = ({
  data,
  dataUtils,
  columns,
  value,
  setValue,
  debounceValue,
  setDebounceValue,
  totalRows,
  perPage,
  page,
  setPage,
  setPerPage,
  setSortDirection,
  setSort,
  getCollections,
  loading,
  ...props
}) => {
  const handleOnChange = (e) => {
    setValue(e.target.value);
    setDebounceValue(e.target.value);
  };

  const handleSort = async (column, sortDirection) => {
    setSort(column.sortField);
    setSortDirection(sortDirection);
  };
  return (
    <div className='table-container' {...props}>
      <div className='rdt_Table'>
        <header className='rdt_TableHeader'>
          <div className='table-header'>
            <input
              type='text'
              placeholder='Search by project name'
              value={value}
              onChange={handleOnChange}
            />
            {dataUtils && !dataUtils.status && (
              <div className='results'>
                <small>About {dataUtils.meta.total} results</small>
              </div>
            )}
          </div>
        </header>
        <DataTable
          columns={columns}
          data={data}
          onChangePage={() => window.scrollTo(0, 0)}
          progressPending={loading}
          noDataComponent={
            <div className='no-data-table'>
              <h1>No collections found</h1>
            </div>
          }
          onSort={handleSort}
          sortServer={true}
          persistTableHead
          sortIcon={<></>}
          progressComponent={
            <div className='table-loader'>
              <div className='spinner-border' role='status'></div>
            </div>
          }
        />
      </div>

      <div className='table-footer'>
        <div className='table-pagination'>
          <div className='table-num-rows'>
            Rows per page :
            <select onChange={(e) => setPerPage(e.target.value)}>
              <option value={10} defaultValue>
                10
              </option>
              <option value={20}>20</option>
              <option value={30}>30</option>
              <option value={40}>40</option>
              <option value={50}>50</option>
            </select>
          </div>
          {dataUtils && !dataUtils.status && (
            <div className='table-paginator'>
              {dataUtils.meta.total >= perPage && (
                <Paginator
                  forcePage={page}
                  nextLabel={<MdNavigateNext />}
                  previousLabel={<MdNavigateBefore />}
                  limit={perPage}
                  totalItems={dataUtils.meta.total}
                  onPageChange={({ selected: selectedPage }) => {
                    setPage(selectedPage + 1);
                  }}
                />
              )}
            </div>
          )}
        </div>

        <p>* All data from OpenSea</p>
        <p>
          ** Est. Market Cap calculated by using 7 day average price * total
          supply
        </p>
      </div>
    </div>
  );
};

export default CollectionsTable;
