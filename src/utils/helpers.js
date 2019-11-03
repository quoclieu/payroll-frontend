export const calculateIncomeTax = salary => {
  let initialTaxAmount = 0;
  let taxOverRate = 0;
  let threshold = 0;
  if (salary <= 18200) {
    return 0;
  } else if (salary >= 18201 && salary <= 37000) {
    initialTaxAmount = 0;
    taxOverRate = 0.19;
    threshold = 18200;
  } else if (salary >= 37001 && salary <= 80000) {
    initialTaxAmount = 3572;
    taxOverRate = 0.325;
    threshold = 37000;
  } else if (salary >= 80001 && salary <= 180000) {
    initialTaxAmount = 17547;
    taxOverRate = 0.37;
    threshold = 80000;
  } else if (salary >= 180001) {
    initialTaxAmount = 54547;
    taxOverRate = 0.45;
    threshold = 180000;
  }
  return Math.round(
    (initialTaxAmount + taxOverRate * (salary - threshold)) / 12
  );
};

export const amountToText = amount => {
  let text = amount.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
  return `$ ${text}.00`;
};
