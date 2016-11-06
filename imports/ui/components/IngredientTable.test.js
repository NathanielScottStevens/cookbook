import React from 'react';
import { shallow } from 'enzyme';
import { expect } from 'meteor/practicalmeteor:chai';
import { describe, it, beforeEach } from 'meteor/practicalmeteor:mocha';
import getMuiTheme from 'material-ui/styles/getMuiTheme';

import IngredientTable from './IngredientTable';
import Recipes from '../../api/recipes/recipes';

describe('IngredientTable', function () {
  const muiTheme = getMuiTheme();

  function render(ingredients, servingMultiplier) {
    return shallow(
      (<IngredientTable
        ingredients={ingredients}
        servingMultiplier={servingMultiplier}
      />),
      { context: { muiTheme } }
    );
  }

  let wrapper;
  let ingredients;
  const servingMultiplier = 3;

  beforeEach(function () {
    ingredients = Factory.create('simpleRecipe').ingredients;
    wrapper = render(ingredients, servingMultiplier);
  });

  it('shows table header', function () {
    const headers = wrapper.find('TableHeaderColumn');
    const labels = headers.map(h => h.children().text());

    expect(labels).to.include('Ingredients');
    expect(labels).to.include('Amount');
  });

  it('shows correct number of rows', function () {
    const rows = wrapper.find('IngredientTableRow');
    expect(rows.length).to.equal(ingredients.length);
  });

  it('passes serving to rows', function () {
    const rows = wrapper.find('IngredientTableRow');
    rows.forEach(row => {
      expect(row.prop('servingMultiplier')).to.equal(servingMultiplier);
    });
  });
});
