import { createStore, applyMiddleware, compose } from 'redux';
import { persistReducer, createTransform } from 'redux-persist';
import thunk from 'redux-thunk';
import storage from 'redux-persist/lib/storage'; 
import { stringify, parse } from 'flatted';

import rootReducer from './reducers';


// handle circular json objects
export const TransformCircular = createTransform( inState => stringify(inState), outState => parse(outState));

const persistConfig = {
  key: 'root',
  storage, // Local storage for web
  whitelist: ['_getERC20Balance'],
  transforms: [TransformCircular],
};

const persistedReducer = persistReducer(persistConfig, rootReducer);
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const store = createStore(
    persistedReducer,
    composeEnhancers(applyMiddleware(thunk))
  );

  export default store;