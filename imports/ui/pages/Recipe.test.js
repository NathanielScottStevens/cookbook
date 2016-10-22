import React from 'react';
import { shallow } from 'enzyme';
import { sinon } from 'meteor/practicalmeteor:sinon';
import { expect } from 'meteor/practicalmeteor:chai';
import { describe, it, context, beforeEach } from 'meteor/practicalmeteor:mocha';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import { TableRowColumn } from 'material-ui/Table';

import Recipe from './Recipe';
import Recipes from '../../api/recipes/recipes';

describe('Recipe', function () {
  const muiTheme = getMuiTheme();

  function renderRecipe(recipe) {
    return shallow(
      (<Recipe
        recipe={recipe}
      />),
      { context: { muiTheme } }
    );
  }

  describe('Rendering', function () {
    let render;
    let recipe;

    context('Simple Recipe', function () {
      beforeEach(function () {
        recipe = Factory.create('simpleRecipe');
        render = renderRecipe(recipe);
      });

      it('shows ingredients', function () {
        const ingredients = render.find('[data-id="ingredient-name"]');
        const actual = ingredients.map(ingredient => ingredient.prop('children'));
        const expected = recipe.ingredients[0].list.map(ingredient => ingredient.name);

        expect(actual).to.deep.equal(expected);
      });

      it('shows steps', function () {
        const steps = render.find('li');
        const actual = steps.map(step => step.text());

        expect(actual).to.deep.equal(recipe.steps[0].list);
      });

      it('shows no subheaders', function () {
        const actual = render.find('Subheader');

        expect(actual.length).to.equal(0);
      });
    });

    context('Complex Recipe', function () {
      beforeEach(function () {
        recipe = Factory.create('complexRecipe');
        render = renderRecipe(recipe);
      });

      it('shows ingredients', function () {
        const ingredients = render.find('[data-id="ingredient-name"]');
        const actual = ingredients.map(ingredient => ingredient.prop('children'));
        let expected = [];

        recipe.ingredients.forEach(group => {
          const expectedIngredients = group.list.map(i => i.name);
          expected = [...expected, ...expectedIngredients];
        });

        expect(actual).to.deep.equal(expected);
      });

      it('shows steps', function () {
        const steps = render.find('li');
        const actual = steps.map(step => step.text());
        let expected = [];

        recipe.steps.forEach(group => {
          expected = [...expected, ...group.list];
        });

        expect(actual).to.deep.equal(expected);
      });
    });
  });
});
