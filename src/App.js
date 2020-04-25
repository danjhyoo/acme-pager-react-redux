import React from "react";
import { HashRouter, Route, Redirect } from "react-router-dom";
import Home from "./Home";

const App = () => {
  return (
    <HashRouter>
      <Route path="/:pageNum" component={Home} />
      <Route exact path="/" render={() => <Redirect to="/0" />} />
    </HashRouter>
  );
};

export default App;
