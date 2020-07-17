import React from 'react';

import { Switch, Route } from 'react-router-dom';

import Home from '../pages/Home';
import Create from '../pages/Create';
import Import from '../pages/Import';
import Report from '../pages/Report';

function routes() {
  return (
    <Switch>
      <Route path="/" exact component={Home} />
      <Route path="/create" component={Create} />
      <Route path="/import" component={Import} />
      <Route path="/report" component={Report} />
    </Switch>
  );
}

export default routes;
