import React, { useState } from 'react';
import styled from 'styled-components';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Row from 'react-bootstrap/Row';
import InputGroup from 'react-bootstrap/InputGroup';
import Col from 'react-bootstrap/Col';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';

import { storeEmployeeInfo } from '../actions';

const FormContainer = styled.div`
  margin-top: 80px;
  display: flex;
  justify-content: center;
`;

const StyledForm = styled(Form)`
  width: 600px;
`;

const GeneratePayslip = props => {
  const [validated, setValidated] = useState(false);

  const handleSubmit = e => {
    const form = e.currentTarget;
    e.preventDefault();
    e.stopPropagation();
    setValidated(true);

    if (form.checkValidity()) {
      const { firstName, lastName, salary, superRate } = e.target.elements;
      props.storeEmployeeInfo({
        firstName: firstName.value,
        lastName: lastName.value,
        salary: salary.value,
        superRate: superRate.value
      });
      props.history.push('/confirmation');
    }
  };

  return (
    <FormContainer>
      <StyledForm noValidate validated={validated} onSubmit={handleSubmit}>
        <h2>Employee Info</h2>
        <Row>
          <Form.Group as={Col} controlId="firstName">
            <Form.Control
              required
              type="text"
              placeholder="First Name"
              defaultValue={props.employeeInfo.firstName}
            />
            <Form.Control.Feedback type="invalid">
              Please enter first name.
            </Form.Control.Feedback>
          </Form.Group>

          <Form.Group as={Col} controlId="lastName">
            <Form.Control
              required
              type="text"
              placeholder="Last Name"
              defaultValue={props.employeeInfo.lastName}
            />
            <Form.Control.Feedback type="invalid">
              Please enter last name.
            </Form.Control.Feedback>
          </Form.Group>
        </Row>

        <Row>
          <Form.Group as={Col} controlId="salary">
            <InputGroup>
              <InputGroup.Prepend>
                <InputGroup.Text>$</InputGroup.Text>
              </InputGroup.Prepend>
              <Form.Control
                required
                type="text"
                placeholder="Annual Salary"
                defaultValue={props.employeeInfo.salary}
              />
              <InputGroup.Append>
                <InputGroup.Text>.00</InputGroup.Text>
              </InputGroup.Append>
              <Form.Control.Feedback type="invalid">
                Please enter annual Salary.
              </Form.Control.Feedback>
            </InputGroup>
          </Form.Group>

          <Form.Group as={Col} controlId="superRate">
            <InputGroup>
              <InputGroup.Prepend>
                <InputGroup.Text id="inputGroupPrepend">%</InputGroup.Text>
              </InputGroup.Prepend>
              <Form.Control
                maxLength="4"
                required
                type="text"
                placeholder="Super Rate eg. 10"
                defaultValue={props.employeeInfo.superRate}
              />
              <Form.Control.Feedback type="invalid">
                Please enter super rate.
              </Form.Control.Feedback>
            </InputGroup>
          </Form.Group>
        </Row>

        <Button variant="primary" type="submit">
          Generate Payslip
        </Button>
      </StyledForm>
    </FormContainer>
  );
};

const mapStateToProps = state => {
  return { employeeInfo: state.employeeInfo };
};

export default withRouter(
  connect(
    mapStateToProps,
    { storeEmployeeInfo }
  )(GeneratePayslip)
);
