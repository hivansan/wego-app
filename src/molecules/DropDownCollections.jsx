import DropDownCollectionItem from './DropdownResults/homeResults/CollectionsResults/DropDownCollectionItem';

const DropDownCollections = ({ results, location }) => {
  const collectionsFiletered =
    !results.status &&
    results.results
      .filter((item) => item.meta.index === 'collections')
      .filter((a, i) => i < 4);

  return (
    <>
      {collectionsFiletered.length > 0 && (
        <div className='drop-down-collections'>
          <header>Collections</header>
          {collectionsFiletered
            .filter((item) => item.value.featuredCollection)
            .map((item) => (
              <DropDownCollectionItem collection={item} key={item.slug} />
            ))}
          {collectionsFiletered
            .filter((item) => !item.value.featuredCollection)
            .map(({ value: collection }) => (
              <DropDownCollectionItem
                collection={collection}
                key={collection.slug}
              />
            ))}
        </div>
      )}
    </>
  );
};

export default DropDownCollections;
