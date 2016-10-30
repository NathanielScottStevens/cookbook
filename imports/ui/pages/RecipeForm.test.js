import React from 'react';
import { shallow } from 'enzyme';
import { sinon } from 'meteor/practicalmeteor:sinon';
import { expect } from 'meteor/practicalmeteor:chai';
import { describe, it, context, beforeEach } from 'meteor/practicalmeteor:mocha';
import getMuiTheme from 'material-ui/styles/getMuiTheme';

import RecipeForm from './RecipeForm';
import Recipes from '../../api/recipes/recipes';
import { RecipeTypes } from '../../api/recipeTypes/recipeTypes';

describe('RecipeForm', function () {
  const muiTheme = getMuiTheme();

  function getTypes() {
    const types = [];

    for (let i = 0; i < 4; i++) {
      const type = Factory.create('recipeType');
      types.push(type.name);
    }

    return types;
  }

  function renderRecipe(recipe, types) {
    return shallow(
      (<RecipeForm
        recipe={recipe}
        types={types}
      />),
      { context: { muiTheme } });
  }

  describe('Rendering', function () {
    let wrapper;
    let recipe;
    let types;

    beforeEach(function () {
      recipe = Factory.create('simpleRecipe');
      types = getTypes();
      wrapper = renderRecipe(recipe, types);
    });

    it('shows the title', function () {
      const title = wrapper.find('[id="recipe-name"]').first();
      expect(title.prop('value')).to.equal(recipe.name);
    });

    it('shows the slug', function () {
      const slug = wrapper.find('[id="recipe-slug"]').first();
      expect(slug.prop('value')).to.equal(recipe.slug);
    });

    it('shows the type dropdown', function () {
      const type = wrapper.find('[id="recipe-type"]');
      expect(type.length).to.equal(1);
    });

    it('shows the type dropdown with options', function () {
      const type = wrapper.find('[id="recipe-type"]');
      const options = type.find('MenuItem');
      const actual = options.map(opt => opt.prop('value'));

      expect(types).to.deep.equal(actual);
    });
  });
});
