import React, { lazy, memo, Suspense, useMemo } from "react";
import {
  Switch,
  Route,
  RouteProps,
  RouteComponentProps,
  Redirect,
} from "react-router-dom";
import HomePage from "./home";

function Pages() {
  return (
    <Switch>
      <Route exact path="/" component={HomePage} />
    </Switch>
  );
}

export default Pages;
