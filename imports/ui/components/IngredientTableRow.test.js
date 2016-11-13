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
  let isEditing = false;

  function render() {
    return shallow(
      (<IngredientTableRow
        ingredient={ingredient}
        servingMultiplier={servingMultiplier}
        striped={striped}
        isEditing={isEditing}
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

    it('shows name', function () {
      const name = wrapper.find('[data-id="ingredient-name"]');
      expect(name.prop('children')).to.equal(ingredient.name);
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

  context('In Edit Mode', function () {
    beforeEach(function () {
      ingredient = Factory.create('simpleRecipe').ingredients[0].list[0];
      ingredient.uom = 'gal';
      servingMultiplier = 3;
      isEditing = true;
      wrapper = render();
    });

    it('shows text field for ingredient', function () {
      const name = wrapper.find('[id="ingredient-name"]');
      expect(name.prop('value')).to.equal(ingredient.name);
    });

    it('shows text field for amount', function () {
      const amount = wrapper.find('[id="ingredient-amount"]');
      expect(amount.prop('value')).to.equal(ingredient.amt);
    });

    it('shows uom dropdown', function () {
      const dropDown = wrapper.find('[id="recipe-uom"]');
      expect(dropDown.prop('value')).to.equal(ingredient.uom);
    });

    it('shows values in uom dropdowns', function () {
      const dropDown = wrapper.find('[id="recipe-uom"]').first();
      const menuTitles = dropDown.find('MenuItem');
      const actualValue = menuTitles.map(i => i.prop('value'));
      const actualText = menuTitles.map(i => i.prop('primaryText'));
      const expected = uoms.map(uom => uom.unit);

      expect(actualValue).to.include.members(expected);
      expect(actualText).to.include.members(expected);
    });
  });
});
