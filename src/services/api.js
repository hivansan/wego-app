'use strict';

import axios from 'axios';

export const baseURL =
  process.env.NODE_ENV === 'production' ? '' : 'http://localhost:3000/';

export class Api {
  /**
   * @param {string} auth - user:password
   */
  constructor(auth) {}

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
