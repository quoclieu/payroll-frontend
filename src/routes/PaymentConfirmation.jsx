import React from 'react';
import { connect } from 'react-redux';
import Table from 'react-bootstrap/Table';
import Button from 'react-bootstrap/Button';
import styled from 'styled-components';
import axios from 'axios';
import { withRouter } from 'react-router-dom';

const Container = styled.div`
  margin-top: 80px;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const InnerContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
`;

const StyledTable = styled(Table)`
  width: 600px;
`;

const ButtonContainer = styled.div`
  display: flex;
  justify-content: space-between;
  width: 100%;
`;

const calculateIncomeTax = salary => {
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

const amountToText = amount => {
  let text = amount.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
  return `$ ${text}.00`;
};

const PaymentConfirmation = props => {
  const { firstName, lastName, salary, superRate } = props.employeeInfo;

  const grossIncome = Math.round(salary / 12);
  const superAmount = Math.round((grossIncome * superRate) / 100);
  const incomeTax = calculateIncomeTax(salary);
  const netIncome = grossIncome - incomeTax;
  const pay = netIncome - superAmount;

  const handlePayBtn = () => {
    const url = '123';
    const date = new Date();
    axios.post(url, {
      day: date.getDate(),
      month: date.getMonth(),
      year: date.getFullYear(),
      firstName,
      lastName,
      salary,
      grossIncome,
      superAmount,
      incomeTax,
      netIncome,
      pay
    });
  };

  return (
    <Container>
      <InnerContainer>
        <h2>Payslip</h2>
        <h3>
          {firstName} {lastName}
        </h3>
        <StyledTable striped>
          <tbody>
            <tr>
              <td>
                <strong>Pay Date</strong>
              </td>
              <td>{new Date().toString().slice(3, 16)}</td>
            </tr>
            <tr>
              <td>
                <strong>Pay Frequency</strong>
              </td>
              <td>Monthly</td>
            </tr>
            <tr>
              <td>
                <strong>Annual Income</strong>
              </td>
              <td>{amountToText(salary)}</td>
            </tr>
            <tr>
              <td>
                <strong>Gross Income</strong>
              </td>
              <td>{amountToText(grossIncome)}</td>
            </tr>
            <tr>
              <td>
                <strong>Income Tax</strong>
              </td>
              <td>{amountToText(incomeTax)}</td>
            </tr>
            <tr>
              <td>
                <strong>Net Income</strong>
              </td>
              <td>{amountToText(netIncome)}</td>
            </tr>
            <tr>
              <td>
                <strong>Super</strong>
              </td>
              <td>{amountToText(superAmount)}</td>
            </tr>
            <tr>
              <td>
                <strong>Pay</strong>
              </td>
              <td>{amountToText(pay)}</td>
            </tr>
          </tbody>
        </StyledTable>
        <ButtonContainer>
          <Button
            variant="danger"
            onClick={() => props.history.push('')}
            style={{ width: 80 }}
          >
            Cancel
          </Button>
          <Button
            variant="primary"
            onClick={handlePayBtn}
            style={{ width: 80 }}
          >
            Pay
          </Button>
        </ButtonContainer>
      </InnerContainer>
    </Container>
  );
};

const mapStateToProps = state => {
  return { employeeInfo: state.employeeInfo };
};

export default connect(mapStateToProps)(withRouter(PaymentConfirmation));
