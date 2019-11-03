import { combineReducers } from 'redux';
import { STORE_INFO } from '../actions';

const employeeInfoReducer = (
  data = {
    firstName: '',
    lastName: '',
    salary: '',
    superRate: ''
  },
  action
) => {
  if (action.type === STORE_INFO) {
    return action.payload;
  }
  return data;
};

export default combineReducers({ employeeInfo: employeeInfoReducer });
