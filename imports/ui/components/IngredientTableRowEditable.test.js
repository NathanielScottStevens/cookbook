import React from 'react';
import { shallow } from 'enzyme';
import { expect } from 'meteor/practicalmeteor:chai';
import { describe, it, beforeEach, context } from 'meteor/practicalmeteor:mocha';
import getMuiTheme from 'material-ui/styles/getMuiTheme';

import IngredientTableRowEditable from './IngredientTableRowEditable';
import Recipes from '../../api/recipes/recipes';
import uoms from '../../api/uoms/fixture';

describe('IngredientTableRowEditable', function () {
  const muiTheme = getMuiTheme();
  let wrapper;
  let ingredient;
  let onChange;
  let onDelete;
  const striped = true;

  function render() {
    return shallow(
      (<IngredientTableRowEditable
        ingredient={ingredient}
        striped={striped}
        uoms={uoms}
        onChange={onChange}
        onDelete={onDelete}
      />),
      { context: { muiTheme } }
    );
  }

  context('Rendering', function () {
    beforeEach(function () {
      ingredient = Factory.create('simpleRecipe').ingredients[0].list[0];
      ingredient.uom = 'gal';
      onChange = sinon.spy();
      onDelete = sinon.spy();
      wrapper = render();
    });

    it('passes striped', function () {
      const row = wrapper.find('TableRow').first();
      const actual = row.prop('striped');
      expect(actual).to.equal(striped);
    });

    it('shows text field for ingredient', function () {
      const label = wrapper.find('[id="ingredient-label"]');
      expect(label.prop('value')).to.equal(ingredient.label);
    });

    it('shows text field for amount', function () {
      const amount = wrapper.find('[id="ingredient-amount"]');
      expect(amount.prop('value')).to.equal(ingredient.amt);
    });

    it('shows delete button', function () {
      expect(wrapper.find('[data-id="delete-button"]'))
        .to.have.a.lengthOf(1);
    });

    it('shows uom dropdown', function () {
      const dropDown = wrapper.find('[id="ingredient-uom"]');
      expect(dropDown.prop('value')).to.equal(ingredient.uom);
    });

    it('shows values in uom dropdowns', function () {
      const dropDown = wrapper.find('[id="ingredient-uom"]').first();
      const menuTitles = dropDown.find('MenuItem');
      const actualValue = menuTitles.map(i => i.prop('value'));
      const actualText = menuTitles.map(i => i.prop('primaryText'));
      const expected = uoms.map(uom => uom.unit);

      expect(actualValue).to.include.members(expected);
      expect(actualText).to.include.members(expected);
    });

    it('calls onChange for label', function () {
      const label = wrapper.find('[id="ingredient-label"]');
      const newValue = 'New Label';
      const expected = Object.assign({}, ingredient, { label: newValue });
      label.simulate('change', null, newValue);

      expect(onChange).to.be.calledWith(expected);
    });

    it('calls onChange for amount', function () {
      const amount = wrapper.find('[id="ingredient-amount"]');
      const newValue = ingredient.amt + 10;
      const expected = Object.assign({}, ingredient, { amt: newValue });
      amount.simulate('change', null, newValue);

      expect(onChange).to.be.calledWith(expected);
    });

    it('amount is passed as a number', function () {
      const amount = wrapper.find('[id="ingredient-amount"]');
      const newValue = '55';
      amount.simulate('change', null, newValue);

      expect(onChange.firstCall.args[0].amt).to.be.a('number');
    });

    it('calls onChange for uom', function () {
      const uom = wrapper.find('[id="ingredient-uom"]');
      const newValueIndex = 3;
      const expected = Object.assign({}, ingredient, { uom: uoms[newValueIndex].unit });
      uom.simulate('change', null, newValueIndex);

      expect(onChange).to.be.calledWith(expected);
    });

    it('calls onDelete', function () {
      wrapper.find('[data-id="delete-button"]').first()
        .simulate('click');
      expect(onDelete).to.have.been.calledOnce;
    });
  });
});
