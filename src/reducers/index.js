import { combineReducers } from 'redux';
import { STORE_INFO } from '../actions';

const employeeInfoReducer = (
  data = {
    firstName: 'John',
    lastName: 'Smith',
    salary: 60050,
    superRate: 9
  },
  action
) => {
  if (action.type === STORE_INFO) {
    return action.payload;
  }
  return data;
};

export default combineReducers({ employeeInfo: employeeInfoReducer });
