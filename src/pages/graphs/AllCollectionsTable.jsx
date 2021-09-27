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
    const res = await api.collections.all({
      where: { name: { like: `%${debounceValue}%` } },
      limit: 50,
    });
    setCollections(res);
  };

  const getCollections = async () => {
    const res = await api.collections.all({
      limit: 500,
      offset: 0,
    });
    setCollections(res);
  };

  useEffect(() => {
    if (debounceValue !== '') {
      return searchCollectionsByParam();
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
      selector: (row) => row.slug,
      cell: (row, idx) => idx + 1,
    },
    {
      name: 'Collection',
      selector: (row) => row.name,
      cell: (row) => {
        return (
          <Link to={`collection/${row.slug}`}>
            <div className='table-collection-info'>
              {row.imgMain ? (
                <img src={row.imgMain} alt={row.name} className='' />
              ) : (
                <img
                  src='https://storage.googleapis.com/opensea-static/opensea-profile/2.png'
                  alt={'default pic'}
                  className=''
                />
              )}
              {row.name ? (
                <>
                  {row.name.length > 15 ? (
                    <> {row.name.substring(0, 15)}..</>
                  ) : (
                    <>{row.name}</>
                  )}
                </>
              ) : (
                <small>
                  {row.slug && (
                    <>
                      {row.slug
                        .split('-')
                        .map((a) => a.charAt(0).toUpperCase() + a.substr(1))
                        .join(' ').length > 15 ? (
                        <>
                          {' '}
                          {row.slug
                            .split('-')
                            .map((a) => a.charAt(0).toUpperCase() + a.substr(1))
                            .join(' ')
                            .substring(0, 15)}
                          ..
                        </>
                      ) : (
                        <>{row.slug}</>
                      )}
                    </>
                  )}
                </small>
              )}
            </div>
          </Link>
        );
      },
    },
    {
      name: 'Volume(7d)',
      selector: (row) => row.sevenDayVolume,
      sortable: true,
      cell: (row) => {
        return (
          <>
            {row.sevenDayVolume.length > 10 ? (
              <> {row.sevenDayVolume.substring(0, 7)}</>
            ) : (
              <>{row.sevenDayVolume}</>
            )}
          </>
        );
      },
    },
    {
      name: 'Sales(7d)',
      selector: (row) => row.sevenDaySales,
      sortable: true,
    },
    {
      name: 'Avg Price(7d)',
      selector: (row) => row.sevenDayAveragePrice,
      sortable: true,
      cell: (row) => {
        return (
          <>
            {row.sevenDayAveragePrice.length > 10 ? (
              <> {row.sevenDayAveragePrice.substring(0, 7)}</>
            ) : (
              <>{row.sevenDayAveragePrice}</>
            )}
          </>
        );
      },
    },
    {
      name: 'Total Supply',
      selector: (row) => row.totalSupply,
      sortable: true,
    },
    {
      name: 'Owners',
      selector: (row) => row.numOwners,
      sortable: true,
    },
    {
      name: 'Estimated MarketCap',
      selector: (row) => row.marketCap,
      sortable: true,
      cell: (row) => {
        return (
          <>
            {row.marketCap.length > 10 ? (
              <> {row.marketCap.substring(0, 7)}</>
            ) : (
              <>{row.marketCap}</>
            )}
          </>
        );
      },
    },
    {
      name: 'Volume(All time)',
      selector: (row) => row.totalVolume,
      sortable: true,
      cell: (row) => {
        return (
          <>
            {row.totalVolume.length > 10 ? (
              <> {row.totalVolume.substring(0, 7)}</>
            ) : (
              <>{row.totalVolume}</>
            )}
          </>
        );
      },
    },
    {
      name: 'Sales(All time)',
      selector: (row) => row.totalSales,
      sortable: true,
      cell: (row) => {
        return (
          <>
            {row.totalSales.length > 5 ? (
              <> {row.totalSales.substring(0, 5)}</>
            ) : (
              <>{row.totalSales}</>
            )}
          </>
        );
      },
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
