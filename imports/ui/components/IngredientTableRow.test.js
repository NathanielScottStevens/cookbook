import React from 'react';
import { shallow } from 'enzyme';
import { expect } from 'meteor/practicalmeteor:chai';
import { describe, it, beforeEach, context } from 'meteor/practicalmeteor:mocha';
import getMuiTheme from 'material-ui/styles/getMuiTheme';

import IngredientTableRow from './IngredientTableRow';
import Recipes from '../../api/recipes/recipes';
import uoms from '../../api/uoms/fixture';

describe('IngredientTableRow', function () {
  const muiTheme = getMuiTheme();
  let wrapper;
  let ingredient;
  let servingMultiplier = 1;
  const striped = true;

  function render() {
    return shallow(
      (<IngredientTableRow
        ingredient={ingredient}
        servingMultiplier={servingMultiplier}
        striped={striped}
        uoms={uoms}
      />),
      { context: { muiTheme } }
    );
  }

  context('single serving', function () {
    beforeEach(function () {
      ingredient = Factory.create('simpleRecipe').ingredients[0].list[0];
      wrapper = render();
    });

    it('shows label', function () {
      const label = wrapper.find('[data-id="ingredient-label"]');
      expect(label.prop('children')).to.equal(ingredient.label);
    });

    it('shows amount', function () {
      const amount = wrapper.find('[data-id="ingredient-amount"]');
      expect(amount.length).to.equal(1);
    });

    it('passes striped', function () {
      const row = wrapper.find('TableRow').first();
      const actual = row.prop('striped');
      expect(actual).to.equal(striped);
    });
  });

  context('multiple servings', function () {
    beforeEach(function () {
      ingredient = Factory.create('simpleRecipe').ingredients[0].list[0];
      ingredient.uom = 'gal';
      servingMultiplier = 3;
      wrapper = render();
    });

    it('increases by serving size', function () {
      const amount = wrapper.find('[data-id="ingredient-amount"]');
      const actual = amount.prop('children').split(' ')[0];
      const expected = ingredient.amt * servingMultiplier;

      expect(Number(actual)).to.equal(expected);
    });
  });
});
