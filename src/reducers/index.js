import { combineReducers } from 'redux';
import auth from './auth';
import products from './products';
import reports from './reports';
import epins from './epins';
import orderHistory from './orderHistory';

export default combineReducers({ auth,products, reports, epins, orderHistory });
