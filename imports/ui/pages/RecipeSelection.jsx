import React from 'react';
import Match from 'react-router/Match';
import Miss from 'react-router/Miss';
import MatchWithSlide from '../components/MatchWithSlide';

import RecipeCategoriesContainer from '../../ui/containers/RecipeCategories';
import RecipeListContainer from '../../ui/containers/RecipeList';
import RecipeContainer from '../../ui/containers/Recipe';
import NotFound from '../../ui/pages/NotFound';


export default function RecipeSelection() {
  return (
    <div>
      <MatchWithSlide exactly pattern="/recipes" component={RecipeCategoriesContainer} />
      <MatchWithSlide exactly pattern="/recipes/:id" component={RecipeListContainer} />
      <MatchWithSlide exactly pattern="/recipes/:id/:id" component={RecipeContainer} />
      {/* <Match exactly pattern="/recipes" component={RecipeCategoriesContainer} />
      <Match exactly pattern="/recipes/:id" component={RecipeListContainer} />
      <Match exactly pattern="/recipes/:id/:id" component={RecipeContainer} /> */}
      <Miss component={NotFound} />
    </div>
  );
}
