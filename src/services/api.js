import axios from 'axios';
import { options } from 'joi';

// export const baseURL = 'https://wegonft.com/api';
export const baseURL = 'http://localhost:3000/api';

export class Api {
  /**
   * @param {string} auth - user:password
   */
  constructor(auth) {
    this.axios = axios.create({
      baseURL,
      headers: {
        accept: 'application/json, text/plain, */*',
        'Content-Type': 'application/json;charset=UTF-8',
        authorization: !localStorage.getItem('token')
          ? ''
          : localStorage.getItem('token'),
      },
    });

    //todo : asset instead assets
    this.assets = {
      findOne: (address, tokenId) => {
        return this.request('get', `/asset/${address}/${tokenId}`);
      },
      score: (address, tokenId) => {
        return this.request('get', `/asset/${address}/${tokenId}/score`);
      },
      
      //{slug, limit, offset,sortBy, sortDirection, traits, priceRange, rankRange, traitsCountRange, buyNow, ownerAddress}
      find:  (options = {}) => {
        const parameters = Object.keys(options).map( key => {
          if (options[key] === null || options[key] === undefined)
            return '';

          if (key === 'traits' || key === 'buyNow')
            return `${key}=${JSON.stringify(options[key])}`;
          
          if (key === 'priceRange' || key === 'rankRange' || key === 'traitsCountRange')
            return `${options[key].param}=${JSON.stringify(options[key].range)}`;

          return `${key}=${options[key]}`;
        })
        .filter( param => param !== '' )
        .join('&');
        
        return this.request('get', `/assets?${parameters}`);
      },
    };

    this.collections = {
      all: ({ limit, page, q, sort, sortOrder } = {}) => {
        const params = new URLSearchParams({
          limit: limit || 10,
          page: page || 1,
          ...(!!sort ? { sort } : {}),
          ...(!!sortOrder ? { sortOrder } : {}),
          ...(!!q ? { q } : {}),
        }).toString();
        const query = params ? `?${params}` : '';
        return this.request('get', `/collections${query}`);
      },

      traits: (slug) => {
        return this.request('get', `/collections/${slug}/traits`);
      },

      findOne: (slug) => {
        return this.request('get', `/collections/${slug}`);
      },

      findByAddress: (address) => {
        return this.request('get', `collections/${address}`);
      },

      count: (slug) => {
        return this.request('get', `/collections/${slug}/count`);
      },
    };

    this.users = {
      findOne: (publicAddress) => {
        return this.request('get', `/users/?publicAddress=${publicAddress}`);
      },

      isLogged: () => {
        return this.request('get', `/users/isLogged`);
      },

      register: (publicAddress) => {
        return this.postRequest('post', '/users', {
          publicAddress,
        });
      },

      login: (publicAddress, sign) => {
        return this.postRequest('post', '/users/login', {
          publicAddress,
          sign,
        });
      },
    };

    this.search = (param, page, tab) => {
      const hasParams = param === '' ? '' : `&q=${encodeURI(param)}`;
      const hasPagination = page ? `&page=${page}` : '';
      const hasTab = tab === 'all' || !tab ? '' : `&tab=${tab}`;
      return this.request(
        'get',
        `/search?limit=20${hasParams}${hasPagination}${hasTab}`
      );
    };
  }

  async request(method, url) {
    try {
      let res = await this.axios[method](url);
      return res.data;
    } catch (error) {
      return error.response;
    }
  }

  async postRequest(method, url, data) {
    try {
      let res = await this.axios[method](url, data);
      return res.data;
    } catch (error) {
      console.log(error);
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
