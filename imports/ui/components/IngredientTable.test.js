import React from 'react';
import { shallow } from 'enzyme';
import { expect } from 'meteor/practicalmeteor:chai';
import { describe, it, beforeEach, context } from 'meteor/practicalmeteor:mocha';
import getMuiTheme from 'material-ui/styles/getMuiTheme';

import IngredientTable from './IngredientTable';
import Recipes from '../../api/recipes/recipes';

describe('IngredientTable', function () {
  const muiTheme = getMuiTheme();
  let wrapper;
  let ingredients;
  const servingMultiplier = 3;

  function render() {
    return shallow(
      (<IngredientTable
        ingredients={ingredients.list}
        label={ingredients.label}
        servingMultiplier={servingMultiplier}
      />),
      { context: { muiTheme } }
    );
  }

  context('with label', function () {
    beforeEach(function () {
      ingredients = Factory.create('complexRecipe').ingredients[0];
      wrapper = render();
    });

    it('shows table header', function () {
      const headers = wrapper.find('TableHeaderColumn');
      const labels = headers.map(h => h.children().text());

      expect(labels).to.include('Ingredients');
      expect(labels).to.include('Amount');
    });

    it('shows correct number of rows', function () {
      const rows = wrapper.find('IngredientTableRow');
      expect(rows.length).to.equal(ingredients.list.length);
    });

    it('passes serving to rows', function () {
      const rows = wrapper.find('IngredientTableRow');
      rows.forEach(row => {
        expect(row.prop('servingMultiplier')).to.equal(servingMultiplier);
      });
    });

    it('shows label', function () {
      const h3 = wrapper.find('h3').first();
      expect(h3.text()).to.equal(ingredients.label);
    });
  });

  context('without label', function () {
    beforeEach(function () {
      ingredients = Factory.create('simpleRecipe').ingredients[0];
      wrapper = render();
    });

    it('shows no label', function () {
      const h3 = wrapper.find('h3');
      expect(h3.length).to.equal(0);
    });
  });
});
