import Store from './stores/store';
import { Api } from './services/api';

const { emitter, store } = Store;
const api = new Api();

export const validateIsLogged = async () => {
  const publicAddress = store.getStore('account').address;
  const api = new Api();
  const validateLogged = await api.users.isLoggedIn();
  if (!validateLogged.isLogged) {
    api.users
      .findOne(publicAddress)
      .then((res) => res)
      .then(({ user }) => (user ? user : api.users.register(publicAddress)))
      .then(handleSignMessage)
      .then((res) => api.users.login(publicAddress, res))
      .then((res) => res.token && localStorage.setItem('token', res.token));
  } else {
    console.log(' logged');
  }
};

export const handleSignMessage = async ({ publicAddress, nonce }) => {
  try {
    const signed = await window.ethereum.request({
      method: 'personal_sign',
      params: [`welcome sign to login, nonce : ${nonce}`, publicAddress],
      from: publicAddress,
    });
    return signed;
  } catch (err) {
    return null;
  }
};

export const oneClickLogin = async () => {};
