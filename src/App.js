import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import GeneratePayslip from './routes/GeneratePayslip';
import PaymentConfirmation from './routes/PaymentConfirmation';

const App = () => {
  return (
    <Router>
      <Switch>
        <Route exact path="/">
          <GeneratePayslip />
        </Route>
        <Route exact path="/confirmation">
          <PaymentConfirmation />
        </Route>
      </Switch>
    </Router>
  );
};

export default App;
