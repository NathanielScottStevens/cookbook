import React from 'react';
import { shallow } from 'enzyme';
import { expect } from 'meteor/practicalmeteor:chai';
import { describe, it, beforeEach, context } from 'meteor/practicalmeteor:mocha';
import { sinon } from 'meteor/practicalmeteor:sinon';
import getMuiTheme from 'material-ui/styles/getMuiTheme';

import IngredientTableEditable from './IngredientTableEditable';
import Recipes from '../../api/recipes/recipes';

describe('IngredientTableEditable', function () {
  const muiTheme = getMuiTheme();
  let wrapper;
  let ingredients;
  const uoms = ['cup', 'tsp', 'tbsp'];
  let onChange;
  let onClear;

  const labelID = '[id="ingredient-label"]';

  function render() {
    return shallow(
      (<IngredientTableEditable
        ingredients={ingredients.list}
        label={ingredients.label}
        uoms={uoms}
        onChange={onChange}
        onClear={onClear}
      />),
      { context: { muiTheme } }
    );
  }

  context('Rendering', function () {
    beforeEach(function () {
      ingredients = Factory.create('complexRecipe').ingredients[0];
      onChange = sinon.spy();
      onClear = sinon.spy();
      wrapper = render();
    });

    it('shows rows', function () {
      const rows = wrapper.find('IngredientTableRowEditable');
      expect(rows).to.have.a.lengthOf(ingredients.list.length);
    });

    it('shows label field', function () {
      expect(wrapper.find(labelID))
        .to.have.a.lengthOf(1);
    });

    it('passes uoms to rows', function () {
      const row = wrapper.find('IngredientTableRowEditable').first();
      expect(row.prop('uoms')).to.include.members(uoms);
    });

    it('shows changed ingredient values', function () {
      const newValue = {
        label: 'New label',
        amt: 5,
        uom: 'oz',
      };
      wrapper.find('IngredientTableRowEditable').first()
        .simulate('change', newValue);

      const row = wrapper.find('IngredientTableRowEditable').first();

      expect(row.prop('ingredient')).to.deep.equal(newValue);
    });

    it('shows changed label value', function () {
      const newValue = 'New Label';
      wrapper.find(labelID).first()
        .simulate('change', null, newValue);

      const label = wrapper.find(labelID).first();

      expect(label.prop('value')).to.deep.equal(newValue);
    });

    it('shows DoneClearButton', function () {
      expect(wrapper.find('DoneClearButton'))
        .to.have.a.lengthOf(1);
    });

    it('calls onChange with new ingredient values', function () {
      const newValue = {
        label: 'New label',
        amt: 5,
        uom: 'oz',
      };
      wrapper.find('IngredientTableRowEditable').first()
        .simulate('change', newValue);

      wrapper.find('DoneClearButton').first()
        .simulate('done');

      const expected = { label: ingredients.label, list: ingredients.list };
      expected.list[0] = newValue;

      expect(onChange).to.have.been.calledWith(expected);
    });

    it('calls onChange with new label value', function () {
      const newValue = 'New Label';
      wrapper.find(labelID).first()
        .simulate('change', null, newValue);

      wrapper.find('DoneClearButton').first()
        .simulate('done');

      const expected = { label: newValue, list: ingredients.list };

      expect(onChange).to.have.been.calledWith(expected);
    });

    it('onClear clears values', function () {
      wrapper.find(labelID).first()
        .simulate('change', null, 'New Label');
      wrapper.find('IngredientTableRowEditable').first()
        .simulate('change', { label: 'l', amt: 5, uom: 'tsp' });
      wrapper.find('DoneClearButton').first()
        .simulate('clear');

      expect(wrapper.find(labelID).first().prop('value'))
        .to.equal(ingredients.label);
      expect(wrapper.find('IngredientTableRowEditable').first().prop('ingredient'))
        .to.deep.equal(ingredients.list[0]);
    });

    it('calls onClear when cleared', function () {
      wrapper.find('DoneClearButton').first()
        .simulate('clear');

      expect(onClear).to.have.been.called;
    });

    it('shows add ingredient button', function () {
      expect(wrapper.find('[data-id="add-ingredient"]'))
        .to.have.a.lengthOf(1);
    });

    it('when ingredient is added a new row is created', function () {
      wrapper.find('[data-id="add-ingredient"]')
        .simulate('click');

      expect(wrapper.find('IngredientTableRowEditable'))
        .to.have.a.lengthOf(ingredients.list.length + 1);
    });

    it('removes ingredient when deleted', function () {
      const ingredient = wrapper.find('IngredientTableRowEditable').first();
      ingredient.simulate('delete');

      expect(wrapper.find('IngredientTableRowEditable').first())
        .to.not.deep.equal(ingredient);
    });
  });
});
