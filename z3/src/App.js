import React, { useEffect } from "react";
import { BrowserRouter, Switch, Route, Redirect } from "react-router-dom";
import { connect } from "react-redux";
import { LastLocationProvider } from "react-router-last-location";

import { SignIn, SignUp, Dashboard } from "./pages";
import { loadUser } from "./actions/authActions";

const App = ({ loadUser }) => {
  useEffect(() => {
    loadUser();
  }, []);

  return (
    <BrowserRouter>
      <LastLocationProvider>
        <Switch>
          <Route exact path="/signin" component={SignIn} />
          <Route exact path="/signup" component={SignUp} />
          <Route exact path="/todos" component={Dashboard} />
          <Redirect from="/" to="/signin" />
        </Switch>
      </LastLocationProvider>
    </BrowserRouter>
  );
};

export default connect(null, { loadUser })(App);
