import React from "react";
import { HashRouter, Route, Redirect } from "react-router-dom";
import Employee from "./Employee";
import Nav from "./Nav";

const App = () => {
  return (
    <HashRouter>
      <Route exact path="/" render={() => <Redirect to="/0" />} />
      <Route path="/:pageNum" component={Employee} />
      <Route path="/:pageNum" component={Nav} />
    </HashRouter>
  );
};

export default App;
