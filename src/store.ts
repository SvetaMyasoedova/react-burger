import { createStore } from 'redux';


import { rootReducer } from './services/reducers';

export const store = createStore(rootReducer); 