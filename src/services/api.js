import axios from 'axios';
import queryString from 'query-string';
import personalSign from '../web3/personalSign';

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
      
      //{slug, limit, offset,sortBy, sortDirection, traits, priceRange, rankRange, traitsCountRange, buyNow, ownerAddress, searchAsset}
      find:  (options = {}) => {
        const parameters = Object.keys(options).map( key => {
          if (options[key] === null || options[key] === undefined)
            return '';

          if (key === 'traits' || key === 'buyNow')
            return `${key}=${JSON.stringify(options[key])}`;
          
          if (key === 'priceRange' || key === 'rankRange' || key === 'traitsCountRange')
            return `${options[key].param}=${JSON.stringify(options[key].range)}`;
          
          if (key === 'searchAsset')
            return `query=${encodeURIComponent(options[key])}`

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

    this.favorites = {
      assets: async account => {
        return this.requireAuth(this.request, account, 'get', `/favorites?${queryString.stringify({ index: 'assets' })}`);
      },
      collections: async account => {
        return this.requireAuth(this.request, account, 'get', `/favorites?${queryString.stringify({ index: 'collections' })}`);
      },
      toggleAsset: async (account, slug, tokenId) => {
        return this.requireAuth(this.postRequest, account, 'post', `/favorite/toggle?${queryString.stringify({ slug, tokenId })}`);
      },
      toggleCollection: async (account, slug) => {
        return this.requireAuth(this.postRequest, account, 'post', `/favorite/toggle?${queryString.stringify({ slug })}`);
      },
    }

    this.users = {
      findOne: (publicAddress) => {
        return this.request('get', `/users/?publicAddress=${publicAddress}`);
      },

      isLogged: () => {
        return this.request('get', `/user/isLogged`);
      },

      register: (publicAddress) => {
        return this.postRequest('post', '/users', {
          publicAddress,
        });
      },

      login: async (account) => {
        console.log(account);
        try {
          const signature = await personalSign(account);
          const { token } = await this.postRequest('post', '/user/login', { publicAddress: account.address, signature });
          console.log(account.address, signature, token);
          localStorage.setItem('token', token);
          this.axios = axios.create({
            baseURL,
            headers: {
              accept: 'application/json, text/plain, */*',
              'Content-Type': 'application/json;charset=UTF-8',
              authorization: token,
            },
          })
          return token;
        } catch (error) {
          throw error;
        }
      },
    };

    this.search = (param, page, tab) => {
      const hasParams = param === '' ? '' : `&q=${encodeURI(param)}`;
      const hasPagination = page ? `&page=${page}` : '';
      const hasTab = tab === 'all' || !tab ? '' : `&tab=${tab}`;
      return this.request('get', `/search?limit=20${hasParams}${hasPagination}${hasTab}`);
    };
  }

  async request(method, url) {
    try {
      const res = await this.axios[method](url);
      return res.data;
    } catch (error) {
      return error.response;
    }
  }

  async postRequest(method, url, data) {
    try {
      const res = await this.axios[method](url, data || {});
      return res.data;
    } catch (error) {
      throw error;
    }
  }

  requireAuth(fn, account, ...args) {
    return this.users.isLogged()
      .then(({ isLogged }) =>
        isLogged
          ? fn.call(this, ...args)
          : this.users.login(account).then(() => fn.call(this, ...args))
      )
      .catch(e => console.log(e));
  }
}