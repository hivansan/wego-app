import axios from 'axios';

let raribleUrl =
  'https://api.rarible.com/protocol/v0.1/ethereum/nft/items/byCollection';

const query = {
  size: 10,
  collection: '0x8b459723c519c66ebf95b4f643ba4aa0f9b0e925',
  includeMeta: true,
};

const getCollection = async (collectionAddress, nextPage) => {
  const searchParams = new URLSearchParams();
  for (const key in query) searchParams.append(key, query[key]);
  if (collectionAddress) searchParams.set('collection', collectionAddress);
  if (nextPage) searchParams.set('continuation', nextPage);
  try {
    let res = await axios.get(`${raribleUrl}?${searchParams.toString()}`);
    return res;
  } catch (error) {
    throw error;
  }
};

export default getCollection;
