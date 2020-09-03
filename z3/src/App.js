import React from "react";
import { BrowserRouter, Switch, Route, Redirect } from "react-router-dom";

import { SignIn, SignUp, Dashboard } from "./pages";

const App = () => {
  return (
    <BrowserRouter>
      <Switch>
        <Route exact path="/signin" component={SignIn} />
        <Route exact path="/signup" component={SignUp} />
        <Route exact path="/todos" component={Dashboard} />
        <Redirect from="/" to="/signin" />
      </Switch>
    </BrowserRouter>
  );
};

export default App;
