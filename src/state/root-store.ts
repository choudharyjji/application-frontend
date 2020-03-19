import { createStore } from 'redux';
import rootReducer from './root-reducer';

const rootStore = createStore(
  rootReducer,
);

export default rootStore;
