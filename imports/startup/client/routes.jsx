import React from 'react';
import { render } from 'react-dom';
import { Router, Route, browserHistory, IndexRoute } from 'react-router';

import App from '../../ui/layouts/App.jsx';

import Index from '../../ui/pages/Index.jsx';
import NotFound from '../../ui/pages/NotFound.jsx';

Meteor.startup(() => {
  render((
    <Router history={browserHistory}>
      <Route path="/" component={App}>
        <IndexRoute component={Index} />
      </Route>
      <Route path="*" component={NotFound} />
    </Router>
  ), document.getElementById('react-root')
  );
});
