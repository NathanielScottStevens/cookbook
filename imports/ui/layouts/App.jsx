import React from 'react';
import Match from 'react-router/Match';
import Miss from 'react-router/Miss';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import Router from 'react-router/BrowserRouter';

import RecipeCategoriesContainer from '../../ui/containers/RecipeCategories';
import RecipeListContainer from '../../ui/containers/RecipeList';
import RecipeContainer from '../../ui/containers/Recipe';
import NotFound from '../../ui/pages/NotFound';

const App = () => {
  // const styles = {
  //   appBar: {
  //     position: 'fixed',
  //     top: 0,
  //   },
  //   root: {
  //     paddingLeft: isMenuDocked ? 256 : 0,
  //     paddingTop: 30,
  //     margin: 50,
  //     display: 'flex',
  //     flexWrap: 'wrap',
  //     justifyContent: 'space-around',
  //   },
  // };

  return (
    <MuiThemeProvider>
      <Router>
        <div>
          <Match exactly pattern="/recipes" component={RecipeCategoriesContainer} />
          <Match exactly pattern="/recipes/:id" component={RecipeListContainer} />
          <Match exactly pattern="/recipes/:id/:id" component={RecipeContainer} />
          <Miss component={NotFound} />
          {/* <Match pattern="/recipes" component={RecipeSelection} /> */}
          {/* <Match pattern="/menus" component={Menu} /> */}
        </div>
      </Router>
    </MuiThemeProvider>
  );
};

export default App;
