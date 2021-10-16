import Store from './stores/store';
import { Api } from './services/api';

const { emitter, store } = Store;
const api = new Api();
const authPath = new Api(localStorage.getItem('token'));

export const validateIsLogged = async () => {
  const isLogged = await authPath.users.isLogged();

  console.log(isLogged);
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

export const oneClickLogin = async () => {
  const publicAddress = store.getStore('account').address;

  api.users
    .findOne(publicAddress)
    .then((res) => res)
    .then(({ user }) => (user ? user : api.users.register(publicAddress)))
    .then(handleSignMessage)
    .then((res) => api.users.login(publicAddress, res))
    .then((res) => {
      if (res.token) {
        localStorage.setItem('token', res.token);
      }
    });
};
