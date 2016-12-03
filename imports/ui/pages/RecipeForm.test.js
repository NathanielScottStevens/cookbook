import React from 'react';
import { shallow } from 'enzyme';
import { sinon } from 'meteor/practicalmeteor:sinon';
import { expect } from 'meteor/practicalmeteor:chai';
import { describe, it, context, beforeEach } from 'meteor/practicalmeteor:mocha';
import getMuiTheme from 'material-ui/styles/getMuiTheme';

import RecipeForm from './RecipeForm';
import Recipes from '../../api/recipes/recipes';
import { RecipeTypes } from '../../api/recipeTypes/recipeTypes';
import uoms from '../../api/uoms/fixture';

describe('RecipeForm', function () {
  const muiTheme = getMuiTheme();

  function getTypes() {
    const types = [];

    for (let i = 0; i < 4; i++) {
      const type = Factory.create('recipeType');
      types.push(type);
    }

    return types;
  }

  function renderRecipe(recipe, types) {
    return shallow(
      (<RecipeForm
        recipe={recipe}
        recipeTypes={types}
        uoms={uoms}
      />),
      { context: { muiTheme } });
  }

  describe('Rendering', function () {
    let wrapper;
    let recipe;
    let types;

    beforeEach(function () {
      recipe = Factory.create('simpleRecipe');
      types = getTypes();
      wrapper = renderRecipe(recipe, types);
    });

    it('shows the title', function () {
      const title = wrapper.find('[id="recipe-label"]').first();
      expect(title.prop('value')).to.equal(recipe.label);
    });

    it('shows the slug', function () {
      const slug = wrapper.find('[id="recipe-slug"]').first();
      expect(slug.prop('value')).to.equal(recipe.slug);
    });

    it('shows the type dropdown', function () {
      const type = wrapper.find('[id="recipe-type"]');
      expect(type.length).to.equal(1);
    });

    it('shows the type dropdown with options', function () {
      const type = wrapper.find('[id="recipe-type"]');
      const options = type.find('MenuItem');
      const expected = types.map(t => t.label);
      const valueActual = options.map(opt => opt.prop('value'));
      const textActual = options.map(opt => opt.prop('primaryText'));

      expect(valueActual).to.include.members(expected);
      expect(textActual).to.include.members(expected);
    });

    it('shows the serving', function () {
      const serving = wrapper.find('[id="recipe-serving"]').first();
      expect(serving.prop('value')).to.equal(recipe.serves);
    });

    it('shows the ingredient labels', function () {
      const ingredients = wrapper.find('[id="recipe-ingredient-label"]');
      const actual = ingredients.map(i => i.prop('value'));
      const expected = recipe.ingredients[0].list.map(i => i.label);
      expect(actual).to.include.members(expected);
    });

    it('shows the ingredient amounts', function () {
      const ingredients = wrapper.find('[id="recipe-ingredient-amount"]');
      const actual = ingredients.map(i => i.prop('value'));
      const expected = recipe.ingredients[0].list.map(i => i.amount);
      expect(actual).to.include.members(expected);
    });

    it('shows the uom dropdowns', function () {
      const dropDowns = wrapper.find('[id="recipe-uom"]');
      const actual = dropDowns.map(uom => uom.prop('value'));
      const expected = recipe.ingredients[0].list.map(i => i.uom);
      expect(actual).to.include.members(expected);
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

    it('shows the steps', function () {
      const textFields = wrapper.find('[id="recipe-step"]');
      const expected = recipe.steps[0].list;
      const actual = textFields.map(t => t.prop('value'));
      expect(expected).to.include.members(actual);
    });
  });
});
