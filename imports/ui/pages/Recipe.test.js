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
  const recipe = Factory.create('recipes');
  const muiTheme = getMuiTheme();

  const render = shallow(
    (<Recipe
      recipe={recipe}
    />),
    { context: { muiTheme } }
  );

  describe('Rendering', function () {
    context('Simple Recipe', function () {
      it('shows ingredients', function () {
        const ingredients = render.find('[data-id="ingredient-name"]');
        const actual = ingredients.map(ingredient => ingredient.prop('children'));
        const expected = recipe.ingredients.map(ingredient => ingredient.name);

        expect(actual).to.deep.equal(expected);
      });

      it('shows steps', function () {
        const steps = render.find('li');
        const actual = steps.map(step => step.text());

        expect(actual).to.deep.equal(recipe.steps);
      });
    });
  });
});
