import React from 'react';
import DataTable from 'react-data-table-component';

import LinearProgress from '@material-ui/core/LinearProgress';

const CollectionsTable = ({
  data,
  columns,
  value,
  setValue,
  debounceValue,
  setDebounceValue,
  ...props
}) => {
  const handleOnChange = (e) => {
    setValue(e.target.value);
    setDebounceValue(e.target.value);
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
          </div>
        </header>
        {!data ? (
          <div className='table-loader'>
            <LinearProgress />
          </div>
        ) : (
          <DataTable
            columns={columns}
            data={data.collections}
            noDataComponent={
              <div className='no-data-table'>
                <h1>No collections found</h1>
              </div>
            }
          />
        )}
      </div>
      <div className='table-footer'>
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
