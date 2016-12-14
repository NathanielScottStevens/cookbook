import React from 'react';
import { shallow } from 'enzyme';
import { sinon } from 'meteor/practicalmeteor:sinon';
import { expect } from 'meteor/practicalmeteor:chai';
import { describe, it, context, beforeEach } from 'meteor/practicalmeteor:mocha';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import { SMALL } from 'material-ui/utils/withWidth';

import Recipe from './Recipe';
import Recipes from '../../api/recipes/recipes';
import recipeTypes from '../../api/recipeTypes/fixture';

describe('Recipe', function () {
  const muiTheme = getMuiTheme();
  const uoms = ['cup', 'tsp', 'tbsp'];
  let wrapper;
  let recipe;

  function renderRecipe() {
    return shallow(
      (<Recipe
        recipe={recipe}
        width={SMALL}
        uoms={uoms}
        recipeTypes={recipeTypes}
      />)
    ).dive().dive({ context: { muiTheme } });
  }

  context('Simple Recipe', function () {
    beforeEach(function () {
      recipe = Factory.create('simpleRecipe');
      wrapper = renderRecipe(recipe);
    });

    it('shows RecipeHeader', function () {
      const header = wrapper.find('RecipeHeader');
      expect(header).to.have.a.lengthOf(1);
    });

    it('has edit button for RecipeHeader', function () {
      const button = wrapper.find('[data-id="header-edit"]');
      expect(button).to.have.a.lengthOf(1);
    });

    it('passes correct props to RecipeHeader', function () {
      const subject = wrapper.find('RecipeHeader');
      const { label, img, serves, onServingChange } = subject.props();

      expect(label, 'label').to.equal(recipe.label);
      expect(img, 'img').to.equal(recipe.img);
      expect(serves, 'serves').to.equal(recipe.serves);
      expect(onServingChange, 'onServingChange').to.exist;
    });

    it('passes correct props to IngredientsGroup', function () {
      const group = wrapper.find('IngredientsGroup').first();

      expect(group.prop('ingredients'), 'ingredients')
        .to.deep.equal(recipe.ingredients);
      expect(group.prop('servingMultiplier'), 'servingMultiplier')
        .to.equal(wrapper.state('servingMultiplier'));
      expect(group.prop('uoms'), 'uoms')
        .to.include.members(uoms);
      expect(group.prop('onChange'), 'onChange')
        .to.exist;
    });

    it('shows StepsGroup', function () {
      const subject = wrapper.find('StepsGroup');
      expect(subject).to.have.a.lengthOf(1);
    });

    it('passes correct props to StepsGroup', function () {
      const subject = wrapper.find('StepsGroup');
      expect(subject.prop('steps')).to.deep.equal(recipe.steps);
      expect(subject.prop('onChange')).to.exist;
    });
  });

  context('Editing RecipeHeader', function () {
    beforeEach(function () {
      recipe = Factory.create('simpleRecipe');
      wrapper = renderRecipe(recipe);
      wrapper.find('[data-id="header-edit"]').simulate('click');
    });

    it('shows RecipeHeaderEditable', function () {
      const actual = wrapper.find('RecipeHeaderEditable');
      expect(actual).to.have.a.lengthOf(1);
    });

    it('passes correct props', function () {
      const subject = wrapper.find('RecipeHeaderEditable');
      expect(subject.prop('label'), 'label').to.equal(recipe.label);
      expect(subject.prop('img'), 'img').to.equal(recipe.img);
      expect(subject.prop('serves'), 'serves').to.equal(recipe.serves);
      expect(subject.prop('slug'), 'slug').to.equal(recipe.slug);
      expect(subject.prop('type'), 'type').to.equal(recipe.type);
      expect(subject.prop('recipeTypes'), 'recipeTypes').to.equal(recipeTypes);
      expect(subject.prop('onChange'), 'onChange').to.exist;
    });

    it('disabled editing onClear', function () {
      wrapper.find('RecipeHeaderEditable').simulate('clear');
      const subject = wrapper.find('RecipeHeaderEditable');
      expect(subject).to.have.a.lengthOf(0);
    });
  });
});
