import React from 'react';
import DataTable from 'react-data-table-component';

const CollectionsTable = ({ data, columns, ...props }) => {
  return (
    <div {...props} className='table-container'>
      <div className='rdt_Table'>
        <header className='rdt_TableHeader'>
          <div className='table-header'>
            <input type='text' placeholder='Search by project name' />
          </div>
        </header>
        <DataTable columns={columns} data={data.collections} />
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
