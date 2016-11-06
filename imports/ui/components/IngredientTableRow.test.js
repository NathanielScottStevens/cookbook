import React from 'react';
import { shallow } from 'enzyme';
import { expect } from 'meteor/practicalmeteor:chai';
import { describe, it, beforeEach, context } from 'meteor/practicalmeteor:mocha';
import getMuiTheme from 'material-ui/styles/getMuiTheme';

import IngredientTableRow from './IngredientTableRow';
import Recipes from '../../api/recipes/recipes';

describe('IngredientTableRow', function () {
  const muiTheme = getMuiTheme();

  function render(ingredient, servingMultiplier) {
    return shallow(
      (<IngredientTableRow
        ingredient={ingredient}
        servingMultiplier={servingMultiplier}
      />),
      { context: { muiTheme } }
    );
  }

  let wrapper;
  let ingredient;
  let servingMultiplier = 1;

  context('single serving', function () {
    beforeEach(function () {
      ingredient = Factory.create('simpleRecipe').ingredients[0].list[0];
      wrapper = render(ingredient, servingMultiplier);
    });

    it('shows name', function () {
      const name = wrapper.find('[data-id="ingredient-name"]');
      expect(name.prop('children')).to.equal(ingredient.name);
    });

    it('shows amount', function () {
      const amount = wrapper.find('[data-id="ingredient-amount"]');
      expect(amount.length).to.equal(1);
    });
  });

  context('multiple servings', function () {
    beforeEach(function () {
      ingredient = Factory.create('simpleRecipe').ingredients[0].list[0];
      ingredient.uom = 'gal';
      servingMultiplier = 3;
      wrapper = render(ingredient, servingMultiplier);
    });

    it('increases by serving size', function () {
      const amount = wrapper.find('[data-id="ingredient-amount"]');
      const actual = amount.prop('children').split(' ')[0];
      const expected = ingredient.amt * servingMultiplier;

      expect(Number(actual)).to.equal(expected);
    });
  });
});
