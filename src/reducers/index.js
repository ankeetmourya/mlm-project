import { combineReducers } from 'redux';
import auth from './auth';
import products from './products';
import reports from './reports';
import epins from './epins';
import orderHistory from './orderHistory';
import networkTree from './networkTree';
import newMembers from './newMembers';
import highPerformingCustomer from './highPerformingCustomer';
import allCustomers from './allCustomers';
import pendingCommissionReport from './pendingCommissionReport';

export default combineReducers({ auth,products, reports, epins, orderHistory, networkTree ,newMembers, highPerformingCustomer, allCustomers,pendingCommissionReport});
