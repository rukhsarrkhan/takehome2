import { createStore, combineReducers, applyMiddleware } from 'redux';
import { thunk } from 'redux-thunk';
import patientReducer from './reducers/patientReducer';

const rootReducer = combineReducers({
    patients: patientReducer,
});

const store = createStore(rootReducer, applyMiddleware(thunk));

export default store;