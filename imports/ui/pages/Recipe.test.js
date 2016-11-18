import React from 'react';
import { shallow } from 'enzyme';
import { sinon } from 'meteor/practicalmeteor:sinon';
import { expect } from 'meteor/practicalmeteor:chai';
import { describe, it, context, beforeEach } from 'meteor/practicalmeteor:mocha';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import { SMALL } from 'material-ui/utils/withWidth';

import Recipe from './Recipe';
import Recipes from '../../api/recipes/recipes';
import { getTypesArray } from '../../api/recipeTypes/recipeTypes';

describe('Recipe', function () {
  const muiTheme = getMuiTheme();
  const uoms = ['cup', 'tsp', 'tbsp'];
  const recipeTypes = getTypesArray();

  function renderRecipe(recipe) {
    return shallow(
      (<Recipe
        recipe={recipe}
        width={SMALL}
        uoms={uoms}
        recipeTypes={recipeTypes}
      />)
    ).dive().dive({ context: { muiTheme } });
  }

  describe('Rendering', function () {
    let wrapper;
    let recipe;

    context('Simple Recipe', function () {
      beforeEach(function () {
        recipe = Factory.create('simpleRecipe');
        wrapper = renderRecipe(recipe);
      });

      it('shows no subheaders', function () {
        const actual = wrapper.find('Subheader');
        expect(actual.length).to.equal(0);
      });
    });

    context('Not In Edit Mode', function () {
      beforeEach(function () {
        recipe = Factory.create('simpleRecipe');
        wrapper = renderRecipe(recipe);
        wrapper.setState({ isEditing: false });
      });

      it('shows edit button', function () {
        const edit = wrapper.find('[data-id="edit-button"]');
        expect(edit.length).to.equal(1);
      });

      it('does not show clear button', function () {
        const clear = wrapper.find('[data-id="clear-button"]');
        expect(clear.length).to.equal(0);
      });

      it('does not show done button', function () {
        const done = wrapper.find('[data-id="done-button"]');
        expect(done.length).to.equal(0);
      });

      it('clicking edit button enables edit mode', function () {
        const edit = wrapper.find('[data-id="edit-button"]').first();
        edit.simulate('click');
        expect(wrapper.state('isEditing')).to.be.true;
      });
    });

    context('In Edit Mode', function () {
      beforeEach(function () {
        recipe = Factory.create('simpleRecipe');
        wrapper = renderRecipe(recipe);
        wrapper.setState({ isEditing: true });
      });

      it('does not show edit button', function () {
        const edit = wrapper.find('[data-id="edit-button"]');
        expect(edit.length).to.equal(0);
      });

      it('shows clear button', function () {
        const clear = wrapper.find('[data-id="clear-button"]');
        expect(clear.length).to.equal(1);
      });

      it('shows done button', function () {
        const done = wrapper.find('[data-id="done-button"]');
        expect(done.length).to.equal(1);
      });

      it('clicking clear button disabled edit mode', function () {
        const clear = wrapper.find('[data-id="clear-button"]').first();
        clear.simulate('click');
        expect(wrapper.state('isEditing')).to.be.false;
      });

      it('clicking done button disabled edit mode', function () {
        const clear = wrapper.find('[data-id="done-button"]').first();
        clear.simulate('click');
        expect(wrapper.state('isEditing')).to.be.false;
      });

      it('sets RecipeHeader to enable editing', function () {
        const header = wrapper.find('RecipeHeader').first();
        expect(header.prop('isEditingEnabled')).to.be.true;
      });

      it('sets IngredientTable to edit mode', function () {
        const table = wrapper.find('IngredientTable').first();
        expect(table.prop('isEditing')).to.be.true;
      });

      it('sets Steps to enabled editing', function () {
        const steps = wrapper.find('Steps').first();
        expect(steps.prop('isEditingEnabled')).to.be.true;
      });

      it('passes uoms to IngredientTable', function () {
        const table = wrapper.find('IngredientTable').first();
        expect(table.prop('uoms')).to.include.members(uoms);
      });

      it('passes recipeTypes to RecipeHeader', function () {
        const header = wrapper.find('RecipeHeader').first();
        expect(header.prop('recipeTypes')).to.include.members(recipeTypes);
      });
    });
  });
});
