import loginReducer from './loginReducer';
import navbarReducer from './navbarReducer';
import inicioReducer from './inicioReducer';
import { combineReducers } from 'redux';

export default combineReducers({
    loginReducer,
    navbarReducer,
    inicioReducer
  });

