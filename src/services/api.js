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
      find: (
        slug,
        limit,
        offset,
        sortBy,
        sortDirection,
        traits,
        priceRange,
        rankRange,
        traitsCountRange,
        buyNow,
        searchAsset
      ) => {
        const hasSorts =
          sortBy === 'none' || !sortBy ? '' : `&sortBy=${sortBy}`;
        const hasTraits = !traits ? '' : `&traits=${JSON.stringify(traits)}`;
        const hasSortDirection = !sortDirection
          ? ''
          : `&sortDirection=${sortDirection}`;
        const hasPriceRange = !priceRange
          ? ''
          : `&${priceRange.param}=${JSON.stringify(priceRange.range)}`;

        const hasRankRange = !rankRange
          ? ''
          : `&${rankRange.param}=${JSON.stringify(rankRange.range)}`;
        const hasTraitsCountRange = !traitsCountRange
          ? ''
          : `&${traitsCountRange.param}=${JSON.stringify(
            traitsCountRange.range
          )}`;
        const isBuyNow = !buyNow ? '' : `&buyNow=${JSON.stringify(buyNow)}`;
        const hasAssetSearch = !searchAsset
          ? ''
          : `&query=${encodeURIComponent(searchAsset)}`;

        const collectionAssetsUrl = `/assets?slug=${slug}&limit=${limit}&offset=${offset}${hasSortDirection}${hasSorts}${hasTraits}${hasPriceRange}${hasRankRange}${hasTraitsCountRange}${isBuyNow}${hasAssetSearch}`;
        return this.request('get', collectionAssetsUrl);
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
      byAddress: (address) => {

      },
      toggle: (account, slug, tokenId) => {
        return this.requireAuth(this.postRequest, account, 'post', `/favorite/toggle?${queryString.stringify({ slug, tokenId })}`);
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