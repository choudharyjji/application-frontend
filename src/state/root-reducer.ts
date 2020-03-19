import { combineReducers } from 'redux';
import { leadApplicationReducer } from './lead-application/reducers';

const rootReducer = combineReducers({
  leadApplication: leadApplicationReducer,
});

export default rootReducer;
