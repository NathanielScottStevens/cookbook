import React from 'react';
import { render } from 'react-dom';
import { Router, Route, browserHistory, IndexRoute } from 'react-router';

import App from '../../ui/layouts/App';

import RecipeSelection from '../../ui/pages/RecipeSelection';
import RecipeCategories from '../../ui/pages/RecipeCategories';
import RecipeListContainer from '../../ui/containers/RecipeList';
import NotFound from '../../ui/pages/NotFound';

Meteor.startup(() => {
  render((
    <Router history={browserHistory}>
      <Route path="/" component={App}>
        <Route path="recipes" component={RecipeSelection}>
          <IndexRoute component={RecipeCategories} />
          <Route path="category/:id" component={RecipeListContainer} />
        </Route>
      </Route>
      <Route path="*" component={NotFound} />
    </Router>
  ), document.getElementById('react-root')
  );
});
