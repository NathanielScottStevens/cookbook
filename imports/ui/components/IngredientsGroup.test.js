import React from 'react';
import { shallow } from 'enzyme';
import { expect } from 'meteor/practicalmeteor:chai';
import { describe, it, beforeEach, context } from 'meteor/practicalmeteor:mocha';
import { sinon } from 'meteor/practicalmeteor:sinon';
import getMuiTheme from 'material-ui/styles/getMuiTheme';

import IngredientsGroup from './IngredientsGroup';
import Recipes from '../../api/recipes/recipes';

describe('IngredientsGroup', function () {
  const muiTheme = getMuiTheme();
  let wrapper;
  let ingredients;
  const uoms = ['tbsp', 'tsp', 'oz'];
  const servingMultiplier = 1;
  let onChange;

  function render() {
    return shallow(
      (<IngredientsGroup
        ingredients={ingredients}
        onChange={onChange}
        uoms={uoms}
        servingMultiplier={servingMultiplier}
      />),
      { context: { muiTheme } }
    );
  }

  context('Rendering', function () {
    beforeEach(function () {
      ingredients = Factory.create('complexRecipe').ingredients;
      wrapper = render();
    });

    it('shows correct number of IngredientTables', function () {
      const subject = wrapper.find('IngredientTable');
      expect(subject).to.have.a.lengthOf(ingredients.length);
    });

    it('shows correct number of EditButtons', function () {
      const subject = wrapper.find('EditButton');
      expect(subject).to.have.a.lengthOf(ingredients.length);
    });
  });

  context('Editing', function () {
    beforeEach(function () {
      ingredients = Factory.create('complexRecipe').ingredients;
      onChange = sinon.spy();
      wrapper = render();
      wrapper.find('[data-id="ingredients-edit-0"]').simulate('click');
    });

    it('shows IngredientTableEditable', function () {
      const subject = wrapper.find('IngredientTableEditable');
      expect(subject).to.have.a.lengthOf(1);
    });

    it('passes correct props', function () {
      const subject = wrapper.find('IngredientTableEditable');
      expect(subject.prop('label'), 'label').to.equal(ingredients[0].label);
      expect(subject.prop('ingredients'), 'ingredients').to.include.members(ingredients[0].list);
      expect(subject.prop('uoms'), 'uoms').to.equal(uoms);
      expect(subject.prop('onChange'), 'onChange').to.exist;
      expect(subject.prop('onClear'), 'onClear').to.exist;
    });

    it('disables editing onClear', function () {
      wrapper.find('IngredientTableEditable').first()
        .simulate('clear');

      expect(wrapper.find('IngredientTableEditable'))
        .to.have.a.lengthOf(0);
    });

    it('disables editing onChange', function () {
      wrapper.find('IngredientTableEditable').simulate('change');
      const subject = wrapper.find('IngredientTableEditable');
      expect(subject).to.have.a.lengthOf(0);
    });

    it('calls onChange with correct values', function () {
      const subject = wrapper.find('IngredientTableEditable').first();
      const newIngredients = {
        label: 'New Label',
        list: ['Ingredient 1', 'Ingredient 2'],
      };

      subject.simulate('change', newIngredients);

      const expected = [...ingredients];
      expected[0] = newIngredients;
      expect(onChange).to.be.calledWith(expected);
    });
  });
});
