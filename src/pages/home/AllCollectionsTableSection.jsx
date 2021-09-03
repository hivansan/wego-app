import React from 'react';
import data from '../../db.json';

import CollectionsTable from '../../molecules/CollectionsTable';

const AllCollectionsTableSection = () => {
  const columns = [
    {
      name: '#',
      selector: (row) => row.id,
      cell: (row, idx) => {
        return <div>{idx + 1}</div>;
      },
    },
    {
      name: 'Collection',
      selector: (row) => row.name,
      cell: (row, i) => {
        return (
          <div className='table-collection-info'>
            <img src={row.avatar} alt='' />
            <small>{row.name}</small>
          </div>
        );
      },
    },
    {
      name: 'Volume(7d)',
      selector: (row) => row.ethereums,
    },
    {
      name: 'Sales(7d)',
      selector: (row) => row.sales,
    },
    {
      name: 'Avg Price(7d)',
      selector: (row) => row.price,
    },
    {
      name: 'Total Supply',
      selector: (row) => row.supply,
    },
    {
      name: 'Owners',
      selector: (row) => row.owners,
    },
    {
      name: 'Owners%',
      selector: (row) => row.ownersPercent,
    },
    {
      name: 'Estimated Market Cap',
      selector: (row) => row.marketCap,
    },
    {
      name: 'Volume(All time)',
      selector: (row) => row.volumeAllTime,
    },
    {
      name: 'Sales(All time)',
      selector: (row) => row.salesAllTime,
    },
    {
      name: 'Added',
      selector: (row) => row.added,
    },
  ];

  return (
    <section className='all-collections-table-section'>
      <h1>
        All <strong>Collections</strong>
      </h1>
      <CollectionsTable data={data} columns={columns} />
    </section>
  );
};

export default AllCollectionsTableSection;
