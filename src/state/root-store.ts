import { createStore } from 'redux';
import rootReducer from './root-reducer';

const rootStore = createStore(
  rootReducer,
  (window as any).__REDUX_DEVTOOLS_EXTENSION__ && (window as any).__REDUX_DEVTOOLS_EXTENSION__(),
);

export default rootStore;
