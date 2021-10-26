import React, { useState, useEffect } from 'react';

import { Api } from '../../services/api';
import { useDebounce } from '../../atoms/hooks/useStateDebounce';

import { Link } from 'react-router-dom';

import CollectionsTable from '../../molecules/CollectionsTable';
import { BiSortDown, BiSortUp } from 'react-icons/bi';
import ImageTypeDetect from '../../molecules/ImageTypeDetect';
import { IoIosCloseCircleOutline } from 'react-icons/io';

const AllCollectionsTable = () => {
  const [collections, setCollections] = useState([]);
  const [value, setValue] = useState('');
  const [debounceValue, setDebounceValue] = useDebounce(value, 500);
  const [perPage, setPerPage] = useState(10);
  const [page, setPage] = useState(1);
  const [sortDirection, setSortDirection] = useState('');
  const [sort, setSort] = useState('');
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState(null);

  const api = new Api();

  const getCollections = async (page, q, sort, sortDirection) => {
    setSort(sort);
    setLoading(true);
    const res = await api.collections.all({
      limit: perPage,
      page,
      q,
      sort,
      sortOrder: sortDirection,
    });
    setCollections(res?.results || []);
    setData(res);
    setLoading(false);
  };

  useEffect(() => {
    getCollections(page, debounceValue, sort, sortDirection);
    setPage(1);
  }, [debounceValue]);

  useEffect(() => {
    getCollections(page, debounceValue, sort, sortDirection);
    window.scrollTo(0, 0);
  }, [perPage]);

  useEffect(() => {
    getCollections(page, debounceValue, sort, sortDirection);
  }, [sort, sortDirection]);

  useEffect(() => {
    getCollections(page, debounceValue, sort, sortDirection);
    window.scrollTo(0, 0);
  }, [page]);

  const columns = [
    {
      name: '#',
      grow: 0,
      selector: ({ value: row }) => row.slug,
      right: true,
      cell: (row, index) => {
        if (page === 1) {
          return index + 1;
        } else {
          return page * perPage + (index + 1 - collections.length);
        }
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
          <div className='text-primary d-flex align-items-center justify-content-between'>
            <div>
              <small>Volume(7d) </small>
              {sortDirection === 'desc' ? (
                <>
                  <BiSortDown size={15} />
                </>
              ) : (
                <BiSortUp size={15} />
              )}
            </div>
            <div className='text-danger mx-1' onClick={() => setSort('')}>
              <IoIosCloseCircleOutline size={20} />
            </div>
          </div>
        ) : (
          <small>Volume(7d)</small>
        ),
      sortField: 'sevenDayVolume',
      selector: ({ value: row }) =>
        row.stats ? row.stats.sevenDayVolume : row.sevenDayVolume,
      sortable: true,

      cell: ({ value: row }) => {
        const stat = row.stats ? row.stats.sevenDayVolume : row.sevenDayVolume;
        return (
          <>
            {stat ? (
              stat.toString().length > 10 ? (
                <> {stat.toString().substring(0, 7)}</>
              ) : (
                <>{stat}</>
              )
            ) : (
              '0'
            )}
          </>
        );
      },
    },
    {
      name:
        sort === 'sevenDaySales' ? (
          <div className='text-primary d-flex align-items-center justify-content-between'>
            <div>
              <small> Sales(7d) </small>
              {sortDirection === 'desc' ? (
                <>
                  <BiSortDown size={15} />
                </>
              ) : (
                <BiSortUp size={15} />
              )}
            </div>
            <div className='text-danger mx-1' onClick={() => setSort('')}>
              <IoIosCloseCircleOutline size={20} />
            </div>
          </div>
        ) : (
          <small>Sales(7d)</small>
        ),
      sortField: 'sevenDaySales',
      selector: ({ value: row }) =>
        row.stats ? row.stats.sevenDaySales : row.sevenDaySales || 0,
      sortable: true,
    },
    {
      name:
        sort === 'sevenDayAveragePrice' ? (
          <div className='text-primary d-flex align-items-center justify-content-between'>
            <div>
              <small>Avg Price(7d)</small>
              {sortDirection === 'desc' ? (
                <>
                  <BiSortDown size={15} />
                </>
              ) : (
                <BiSortUp size={15} />
              )}
            </div>
            <div className='text-danger mx-1' onClick={() => setSort('')}>
              <IoIosCloseCircleOutline size={20} />
            </div>
          </div>
        ) : (
          <small>Avg Price(7d)</small>
        ),
      sortField: 'sevenDayAveragePrice',
      selector: ({ value: row }) =>
        row.stats ? row.stats.sevenDayAveragePrice : row.sevenDayAveragePrice,
      sortable: true,
      cell: ({ value: row }) => {
        const stat = row.stats
          ? row.stats.sevenDayAveragePrice
          : row.sevenDayAveragePrice;
        return (
          <>
            {stat ? (
              stat.toString().length > 10 ? (
                <> {stat.toString().substring(0, 7)}</>
              ) : (
                <>{stat}</>
              )
            ) : (
              '0'
            )}
          </>
        );
      },
    },
    {
      name:
        sort === 'totalSupply' ? (
          <div className='text-primary d-flex align-items-center justify-content-between'>
            <div>
              <small>Total Supply</small>
              {sortDirection === 'desc' ? (
                <>
                  <BiSortDown size={15} />
                </>
              ) : (
                <BiSortUp size={15} />
              )}
            </div>
            <div className='text-danger mx-1' onClick={() => setSort('')}>
              <IoIosCloseCircleOutline size={20} />
            </div>
          </div>
        ) : (
          <small>Total Supply</small>
        ),
      sortField: 'totalSupply',
      selector: ({ value: row }) =>
        row.stats ? row.stats.totalSupply : row.totalSupply || 0,
      sortable: true,
    },
    {
      name:
        sort === 'numOwners' ? (
          <div className='text-primary d-flex align-items-center justify-content-between'>
            <div>
              <small>Owners</small>
              {sortDirection === 'desc' ? (
                <>
                  <BiSortDown size={15} />
                </>
              ) : (
                <BiSortUp size={15} />
              )}
            </div>
            <div className='text-danger mx-1' onClick={() => setSort('')}>
              <IoIosCloseCircleOutline size={20} />
            </div>
          </div>
        ) : (
          <small>Owners</small>
        ),
      sortField: 'numOwners',
      selector: ({ value: row }) =>
        row.stats ? row.stats.numOwners : row.numOwners || 0,
      sortable: true,
    },
    {
      name:
        sort === 'marketCap' ? (
          <div className='text-primary d-flex align-items-center justify-content-between'>
            <div>
              <small>Estimated MarketCap</small>
              {sortDirection === 'desc' ? (
                <>
                  <BiSortDown size={15} />
                </>
              ) : (
                <BiSortUp size={15} />
              )}
            </div>
            <div className='text-danger mx-1' onClick={() => setSort('')}>
              <IoIosCloseCircleOutline size={20} />
            </div>
          </div>
        ) : (
          <small>Estimated MarketCap</small>
        ),
      sortField: 'marketCap',
      selector: ({ value: row }) =>
        row.stats ? row.stats.marketCap : row.marketCap || 0,
      sortable: true,
      cell: ({ value: row }) => {
        const stat = row.stats ? row.stats.marketCap : row.marketCap;
        return (
          <>
            {stat ? (
              stat.toString().length > 10 ? (
                <> {stat.toString().substring(0, 7)}</>
              ) : (
                <>{stat}</>
              )
            ) : (
              '0'
            )}
          </>
        );
      },
    },
    {
      name:
        sort === 'totalVolume' ? (
          <div className='text-primary d-flex align-items-center justify-content-between'>
            <div>
              <small>Volume(All time)</small>
              {sortDirection === 'desc' ? (
                <>
                  <BiSortDown size={15} />
                </>
              ) : (
                <BiSortUp size={15} />
              )}
            </div>
            <div className='text-danger mx-1' onClick={() => setSort('')}>
              <IoIosCloseCircleOutline size={20} />
            </div>
          </div>
        ) : (
          <small>Volume(All time)</small>
        ),
      sortField: 'totalVolume',
      selector: ({ value: row }) =>
        row.stats ? row.stats.totalVolume : row.totalVolume || 0,
      sortable: true,
      cell: ({ value: row }) => {
        const stat = row.stats ? row.stats.totalVolume : row.totalVolume;
        return (
          <>
            {stat ? (
              stat.toString().length > 10 ? (
                <> {stat.toString().substring(0, 7)}</>
              ) : (
                <>{stat}</>
              )
            ) : (
              '0'
            )}
          </>
        );
      },
    },
    {
      name:
        sort === 'totalSales' ? (
          <div className='text-primary d-flex align-items-center justify-content-between'>
            <div>
              <small>Sales(All time)</small>
              {sortDirection === 'desc' ? (
                <>
                  <BiSortDown size={15} />
                </>
              ) : (
                <BiSortUp size={15} />
              )}
            </div>
            <div className='text-danger mx-1' onClick={() => setSort('')}>
              <IoIosCloseCircleOutline size={20} />
            </div>
          </div>
        ) : (
          <small>Sales(All time)</small>
        ),
      sortField: 'totalSales',
      selector: ({ value: row }) =>
        row.stats ? row.stats.totalSales : row.totalSales || 0,
      sortable: true,
      cell: ({ value: row }) => {
        const stat = row.stats ? row.stats.totalSales : row.totalSales;
        return (
          <>
            {stat ? (
              stat.toString().length > 5 ? (
                <> {stat.toString().substring(0, 5)}</>
              ) : (
                <>{stat}</>
              )
            ) : (
              '0'
            )}
          </>
        );
      },
    },
    {
      name:
        sort === 'floorPrice' ? (
          <div className='text-primary d-flex align-items-center justify-content-between'>
            <div>
              <small>Floor Price</small>
              {sortDirection === 'desc' ? (
                <>
                  <BiSortDown size={15} />
                </>
              ) : (
                <BiSortUp size={15} />
              )}
            </div>
            <div className='text-danger mx-1' onClick={() => setSort('')}>
              <IoIosCloseCircleOutline size={20} />
            </div>
          </div>
        ) : (
          <small>Floor Price</small>
        ),
      sortField: 'floorPrice',
      selector: ({ value: row }) =>
        row.stats ? row.stats.floorPrice : row.floorPrice || 0,
      sortable: true,
      cell: ({ value: row }) => {
        const stat = row.stats ? row.stats.floorPrice : row.floorPrice;
        return (
          <>
            {stat ? (
              stat.toString().length > 5 ? (
                <> {stat.toString().substring(0, 5)}</>
              ) : (
                <>{stat}</>
              )
            ) : (
              '0'
            )}
          </>
        );
      },
    },
  ];

  return (
    <section className='all-collections-table-section'>
      <CollectionsTable
        dataUtils={data}
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
