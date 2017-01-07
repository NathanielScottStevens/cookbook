import React from 'react';
import Match from 'react-router/Match';
import Miss from 'react-router/Miss';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import Router from 'react-router/BrowserRouter';

import RecipeCategoriesContainer from '../../ui/containers/RecipeCategories';
import RecipeListContainer from '../../ui/containers/RecipeList';
import RecipeContainer from '../../ui/containers/Recipe';
import AddRecipe from '../../ui/containers/AddRecipe';
import NotFound from '../../ui/pages/NotFound';

const App = () => {
  return (
    <MuiThemeProvider>
      <Router>
        <div>
          <Match exactly pattern="/recipes" component={RecipeCategoriesContainer} />
          <Match exactly pattern="/recipes/:id" component={RecipeListContainer} />
          <Match exactly pattern="/recipes/:id/:id" component={RecipeContainer} />
          <Match exactly pattern="/add-recipe" component={AddRecipe} />
          <Miss component={NotFound} />
        </div>
      </Router>
    </MuiThemeProvider>
  );
};

export default App;
