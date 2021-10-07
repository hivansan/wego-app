import React, { useState, useEffect } from 'react';

import { Api } from '../../services/api';
import { useDebounce } from '../../atoms/hooks/useStateDebounce';

import { Link } from 'react-router-dom';

import CollectionsTable from '../../molecules/CollectionsTable';
import { BiSortDown, BiSortUp } from 'react-icons/bi';
import ImageTypeDetect from '../../molecules/ImageTypeDetect';

const AllCollectionsTable = () => {
  const [collections, setCollections] = useState([]);
  const [value, setValue] = useState('');
  const [debounceValue, setDebounceValue] = useDebounce(value, 500);
  const [totalRows, setTotalRows] = useState(0);
  const [perPage, setPerPage] = useState(10);
  const [page, setPage] = useState(0);
  const [sortDirection, setSortDirection] = useState('');
  const [sort, setSort] = useState('');
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState(null);

  const api = new Api();

  const getCollections = async (page, q, sort, sortDirection) => {
    setSort(sort);
    console.log(sortDirection);
    const hasParam = q === '' ? null : q;
    const hasSort = sort === '' ? null : sort;
    const hasdSortDirection = sortDirection === '' ? null : sortDirection;
    setLoading(true);
    const res = await api.collections.all(
      perPage,
      page,
      hasParam,
      hasSort,
      hasdSortDirection
    );

    setCollections(res.results);
    setLoading(false);
  };

  useEffect(() => {
    getCollections(page, debounceValue, sort, sortDirection);
  }, [debounceValue]);

  // useEffect(() => {
  //   console.log(page);
  // }, [page]);

  useEffect(() => {
    getCollections(page, debounceValue, sort, sortDirection);
    window.scrollTo(0, 0);
  }, [perPage]);

  useEffect(() => {
    getCollections(page, debounceValue, sort, sortDirection);
  }, [sort, sortDirection]);

  const columns = [
    {
      name: '#',
      selector: ({ value: row }) => row.slug,
      right: true,
      cell: ({ value: row }, idx) => {
        const i = idx + 1;
        return <>{i}</>;
      },
    },
    {
      name: 'Collection',
      selector: ({ value: row }) => row.name,
      cell: ({ value: row }) => {
        return (
          <Link to={`collection/${row.slug}`}>
            <div className='table-collection-info'>
              <ImageTypeDetect
                imageURL={row.imgMain}
                alt={row.name}
                className='table-collection-img'
              />

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
      name:
        sort === 'sevenDayVolume' ? (
          <strong className='text-primary'>
            Volume(7d){' '}
            {sortDirection === 'desc' ? (
              <BiSortDown size={15} />
            ) : (
              <BiSortUp size={15} />
            )}
          </strong>
        ) : (
          <small>Volume(7d)</small>
        ),
      sortField: 'sevenDayVolume',
      selector: ({ value: row }) => row.sevenDayVolume,
      sortable: true,

      cell: ({ value: row }) => {
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
      name:
        sort === 'sevenDaySales' ? (
          <strong className='text-primary'>
            Sales(7d){' '}
            {sortDirection === 'desc' ? (
              <BiSortDown size={15} />
            ) : (
              <BiSortUp size={15} />
            )}
          </strong>
        ) : (
          <small>Sales(7d)</small>
        ),
      sortField: 'sevenDaySales',
      selector: ({ value: row }) => row.sevenDaySales,
      sortable: true,
    },
    {
      name:
        sort === 'sevenDayAveragePrice' ? (
          <strong className='text-primary'>
            Avg Price(7d){' '}
            {sortDirection === 'desc' ? (
              <BiSortDown size={15} />
            ) : (
              <BiSortUp size={15} />
            )}
          </strong>
        ) : (
          <small>Avg Price(7d)</small>
        ),
      sortField: 'sevenDayAveragePrice',
      selector: ({ value: row }) => row.sevenDayAveragePrice,
      sortable: true,
      cell: ({ value: row }) => {
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
      name:
        sort === 'totalSupply' ? (
          <strong className='text-primary'>
            Total Supply{' '}
            {sortDirection === 'desc' ? (
              <BiSortDown size={15} />
            ) : (
              <BiSortUp size={15} />
            )}
          </strong>
        ) : (
          <small>Total Supply</small>
        ),
      sortField: 'totalSupply',
      selector: ({ value: row }) => row.totalSupply,
      sortable: true,
    },
    {
      name:
        sort === 'numOwners' ? (
          <strong className='text-primary'>
            Owners{' '}
            {sortDirection === 'desc' ? (
              <BiSortDown size={15} />
            ) : (
              <BiSortUp size={15} />
            )}
          </strong>
        ) : (
          <small>Owners</small>
        ),
      sortField: 'numOwners',
      selector: ({ value: row }) => row.numOwners,
      sortable: true,
    },
    {
      name:
        sort === 'marketCap' ? (
          <strong className='text-primary'>
            Estimated MarketCap{' '}
            {sortDirection === 'desc' ? (
              <BiSortDown size={15} />
            ) : (
              <BiSortUp size={15} />
            )}
          </strong>
        ) : (
          <small>Estimated MarketCap</small>
        ),
      sortField: 'marketCap',
      selector: ({ value: row }) => row.marketCap,
      sortable: true,
      cell: ({ value: row }) => {
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
      name:
        sort === 'totalVolume' ? (
          <strong className='text-primary'>
            Volume(All time){' '}
            {sortDirection === 'desc' ? (
              <BiSortDown size={15} />
            ) : (
              <BiSortUp size={15} />
            )}
          </strong>
        ) : (
          <small>Volume(All time)</small>
        ),
      sortField: 'totalVolume',
      selector: ({ value: row }) => row.totalVolume,
      sortable: true,
      cell: ({ value: row }) => {
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
      name:
        sort === 'totalSales' ? (
          <strong className='text-primary'>
            Sales(All time){' '}
            {sortDirection === 'desc' ? (
              <BiSortDown size={15} />
            ) : (
              <BiSortUp size={15} />
            )}
          </strong>
        ) : (
          <small>Sales(All time)</small>
        ),
      sortField: 'totalSales',
      selector: ({ value: row }) => row.totalSales,
      sortable: true,
      cell: ({ value: row }) => {
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
        loading={loading}
        getCollections={getCollections}
        setPerPage={setPerPage}
        data={collections}
        columns={columns}
        value={value}
        setValue={setValue}
        debounceValue={debounceValue}
        setDebounceValue={setDebounceValue}
        perPage={perPage}
        setPage={setPage}
        page={page}
        setSort={setSort}
        setSortDirection={setSortDirection}
      />
    </section>
  );
};

export default AllCollectionsTable;
