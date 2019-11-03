export const STORE_INFO = 'STORE_INFO';
export const storeEmployeeInfo = employeeInfo => {
  return {
    type: STORE_INFO,
    payload: {
      firstName: employeeInfo.firstName,
      lastName: employeeInfo.lastName,
      salary: employeeInfo.salary,
      superRate: employeeInfo.superRate
    }
  };
};
