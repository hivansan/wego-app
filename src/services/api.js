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

    this.assets = {
      findByAddress: (address) => {
        return this.request('get', `assets/${address}`);
      },

      findOne: (address, tokenId) => {
        return this.request('get', `api/Assets/${address}/${tokenId}`);
      },

      findByContract: (address, offset) => {
        const url = `https://api.opensea.io/api/v1/assets?asset_contract_address=${address}&order_direction=desc&offset=${offset}&limit=20`;
        return this.request('get', url);
      },
    };

    this.collections = {
      all: (filter) => {
        // console.log(filter);
        const hasFilter = filter
          ? `?filter=${encodeURIComponent(JSON.stringify(filter))}`
          : '';
        return this.request('get', `/api/Collections${hasFilter}`);
      },

      findOne: (slug) => {
        return this.request('get', `/api/Collections/get?q=${slug}`);
      },

      hotCollections: () => {
        return this.request('get', 'hotCollections');
      },

      searchCollections: (param) => {
        const query = `search?q=${encodeURI(param)}`;
        return this.request('get', `collections/${query}`);
      },

      findByAddress: (address) => {
        return this.request('get', `collections/${address}`);
      },

      assets: (slug, filter) => {
        const encodeFilter = encodeURIComponent(JSON.stringify(filter));
        return this.request(
          'get',
          `/api/Collections/${slug}/assets?filter=${encodeFilter}`
        );
      },
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

  async search(param) {
    const query = `search?q=${encodeURI(param)}`;
    const searchUrl = baseURL + query;

    try {
      let res = await axios.get(searchUrl);
      return res.data;
    } catch (error) {
      throw error;
    }
  }

  async trending() {
    const trendingUrl = baseURL + 'trending';
    try {
      let res = await axios.get(trendingUrl);
      return res.data;
    } catch (error) {
      throw error;
    }
  }
}
