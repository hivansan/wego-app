import axios from 'axios';

export const baseURL =
  process.env.NODE_ENV === 'production' ? '' : 'http://localhost:3000/';

export class Api {
  /**
   * @param {string} auth - user:password
   */
  constructor(auth) {
    this.axios = axios.create({
      baseURL,
      headers: {
        accept: 'application/json, text/plain, */*',
      },
    });

    //todo : asset instead assets
    this.assets = {
      findOne: (address, tokenId) => {
        return this.request('get', `api/asset/${address}/${tokenId}`);
      },
      score: (address, tokenId) => {
        return this.request('get', `api/asset/${address}/${tokenId}/score`);
      },
    };

    this.collections = {
      all: ({ limit, page, q, sort, sortOrder } = {}) => {
        const params = new URLSearchParams({
          limit: limit || 10,
          page: page || 0,
          ...(!!sort ? { sort } : {}),
          ...(!!sortOrder ? { sortOrder } : {}),
          ...(!!q ? { q } : {})
        }).toString();

        const query = params ? `?${params}` : '';
        console.log(`api/Collections${query}`);

        return this.request('get', `api/Collections${query}`);
      },

      traits: (slug) => {
        return this.request('get', `api/collections/${slug}/traits`);
      },

      findOne: (slug) => {
        return this.request('get', `api/collections/${slug}`);
      },

      searchCollections: (param) => {
        const query = `search?q=${encodeURI(param)}`;
        return this.request('get', `collections/${query}`);
      },

      findByAddress: (address) => {
        return this.request('get', `collections/${address}`);
      },

      assets: (slug, limit, offset, sortBy, sortDirection, traits) => {
        const hasSorts =
          sortBy === 'none' || !sortBy ? '' : `&sortBy=${sortBy}`;
        const hasTraits = !traits ? '' : `&traits=${JSON.stringify(traits)}`;
        const hasSortDirection = !sortDirection
          ? ''
          : `&sortDirection=${sortDirection}`;
        const collectionAssetsUrl = `api/assets?slug=${slug}&limit=${limit}&offset=${offset}${hasSortDirection}${hasSorts}${hasTraits}`;
        return this.request('get', collectionAssetsUrl);
      },
    };

    this.search = (param) => {
      const hasParams =
        param === ''
          ? `api/search`
          : `api/search?q=${encodeURI(param)}&limit=20`;
      return this.request('get', hasParams);
    };
  }

  async request(method, url) {
    try {
      let res = await this.axios[method](url);
      return res.data;
    } catch (error) {
      throw error;
    }
  }

  // async search(param) {
  //   const query = `search?q=${encodeURI(param)}`;
  //   const searchUrl = baseURL + query;

  //   try {
  //     let res = await axios.get(searchUrl);
  //     return res.data;
  //   } catch (error) {
  //     throw error;
  //   }
  // }
}
