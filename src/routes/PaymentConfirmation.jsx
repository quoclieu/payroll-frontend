import React, { useState } from 'react';
import { connect } from 'react-redux';
import Table from 'react-bootstrap/Table';
import Button from 'react-bootstrap/Button';
import Spinner from 'react-bootstrap/Spinner';
import Alert from 'react-bootstrap/Alert';
import styled from 'styled-components';
import axios from 'axios';
import { withRouter } from 'react-router-dom';
import { calculateIncomeTax, amountToText } from '../utils/helpers';
import TableRow from '../components/TableRow';

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

const StyledAlert = styled(Alert)`
  margin-top: 20px;
  width: 100%;
`;

const StyledButton = styled(Button)`
  width: 90px;
`;

const PaymentConfirmation = props => {
  const { firstName, lastName, salary, superRate } = props.employeeInfo;
  const [isLoading, setLoading] = useState(false);
  const [message, setMessage] = useState('');
  const [isSuccess, setIsSuccess] = useState(false);

  const grossIncome = Math.round(salary / 12);
  const superAmount = Math.round((grossIncome * superRate) / 100);
  const incomeTax = calculateIncomeTax(salary);
  const netIncome = grossIncome - incomeTax;
  const pay = netIncome - superAmount;

  const handlePayBtn = () => {
    const url = 'http://localhost:8000/pay';
    const date = new Date();
    const data = {
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
    };
    console.log(data);
    setLoading(true);
    axios({
      url,
      method: 'post',
      data
    })
      .then(res => {
        setLoading(false);
        if (res.data.error) {
          setMessage(res.data.error);
          setIsSuccess(false);
        } else {
          setIsSuccess(true);
          setMessage('Employee Paid Successfully!');
        }
      })
      .catch(() => {
        setLoading(false);
        setMessage('Error occured.');
        setIsSuccess(false);
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
            <TableRow
              title="Pay Date"
              value={new Date().toString().slice(3, 16)}
            />
            <TableRow title="Pay Frequency" value="Monthly" />
            <TableRow title="Annual Income" value={amountToText(salary)} />
            <TableRow title="Gross Income" value={amountToText(grossIncome)} />
            <TableRow title="Income Tax" value={amountToText(incomeTax)} />
            <TableRow title="Net Income" value={amountToText(netIncome)} />
            <TableRow title="Super" value={amountToText(superAmount)} />
            <TableRow title="Pay" value={amountToText(pay)} />
          </tbody>
        </StyledTable>
        {isLoading ? (
          <Spinner animation="border" variant="primary" />
        ) : (
          <>
            <ButtonContainer>
              <StyledButton
                variant="danger"
                onClick={() => props.history.push('')}
                style={{ width: 80 }}
              >
                {isSuccess ? 'Back' : 'Cancel'}
              </StyledButton>
              <StyledButton
                variant="primary"
                onClick={handlePayBtn}
                style={{ width: 80 }}
              >
                Pay
              </StyledButton>
            </ButtonContainer>
          </>
        )}

        {message && (
          <StyledAlert variant={isSuccess ? 'success' : 'danger'}>
            {message}
          </StyledAlert>
        )}
      </InnerContainer>
    </Container>
  );
};

const mapStateToProps = state => {
  return { employeeInfo: state.employeeInfo };
};

export default connect(mapStateToProps)(withRouter(PaymentConfirmation));
