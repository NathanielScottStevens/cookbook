import React from 'react';
import { render } from 'react-dom';
import { Router, Route, browserHistory, IndexRoute } from 'react-router';

import App from '../../ui/layouts/App';

import RecipeSelection from '../../ui/pages/RecipeSelection';
import RecipeCategories from '../../ui/pages/RecipeCategories';
import RecipeListContainer from '../../ui/containers/RecipeList';
import RecipeContainer from '../../ui/containers/Recipe';
import NotFound from '../../ui/pages/NotFound';

Meteor.startup(() => {
  render((
    <App />
  ), document.getElementById('react-root')
  );
});
