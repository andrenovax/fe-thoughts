import React from 'react';
import { Route, Router } from 'libs/router';
import { UsersPageWithData } from "./pages/Users";

export function App({ routerConfig, routerValues }: any) {
  return (
    <Router config={routerConfig} values={routerValues}>
      <Route name="user" component={UsersPageWithData} />
    </Router>
  );
}
