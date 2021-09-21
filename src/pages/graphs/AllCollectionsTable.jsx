import React, { useState, useEffect } from 'react';

import { Api } from '../../services/api';
import { useDebounce } from '../../atoms/hooks/useStateDebounce';

import { Link } from 'react-router-dom';

import CollectionsTable from '../../molecules/CollectionsTable';

const AllCollectionsTable = () => {
  const [collections, setCollections] = useState(null);
  const [value, setValue] = useState('');
  const [debounceValue, setDebounceValue] = useDebounce(value, 500);
  const api = new Api();

  const searchCollectionsByParam = async () => {
    setCollections(null);
    const res = await api.collections.searchCollections(debounceValue);
    setCollections(res);
  };

  const getCollections = async () => {
    const res = await api.collections.all();
    setCollections(res);
  };

  useEffect(() => {
    if (debounceValue !== '') {
      searchCollectionsByParam();
    }

    if (value === '') {
      getCollections();
    }

    return () => {
      setCollections(null);
    };
  }, [debounceValue]);

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
          <Link to={`collection/${row.address}`}>
            <div className='table-collection-info'>
              <img src={row.image} alt='' className='mx-2' />
              <small>{row.name}</small>
            </div>
          </Link>
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
      <CollectionsTable
        data={collections}
        columns={columns}
        value={value}
        setValue={setValue}
        debounceValue={debounceValue}
        setDebounceValue={setDebounceValue}
      />
    </section>
  );
};

export default AllCollectionsTable;
