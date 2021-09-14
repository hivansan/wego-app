'use strict';

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
    };

    this.collections = {
      all: () => {
        return this.request('get', 'collections');
      },

      searchCollections: (param) => {
        const query = `search?q=${encodeURI(param)}`;
        return this.request('get', `collections/${query}`);
      },

      findByAddress: (address) => {
        return this.request('get', `collections/${address}`);
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
