import React from 'react';
import { shallow } from 'enzyme';
import { sinon } from 'meteor/practicalmeteor:sinon';
import { expect } from 'meteor/practicalmeteor:chai';
import { describe, it, context, beforeEach } from 'meteor/practicalmeteor:mocha';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import { SMALL } from 'material-ui/utils/withWidth';

import Recipe from './Recipe';
import Recipes from '../../api/recipes/recipes';

describe('Recipe', function () {
  const muiTheme = getMuiTheme();

  function renderRecipe(recipe) {
    return shallow(
      (<Recipe
        recipe={recipe}
        width={SMALL}
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

      it('shows steps', function () {
        const steps = wrapper.find('li');
        const actual = steps.map(step => step.text());

        expect(actual).to.deep.equal(recipe.steps[0].list);
      });

      it('shows no subheaders', function () {
        const actual = wrapper.find('Subheader');

        expect(actual.length).to.equal(0);
      });
    });

    context('Complex Recipe', function () {
      beforeEach(function () {
        recipe = Factory.create('complexRecipe');
        wrapper = renderRecipe(recipe);
      });

      it('shows steps', function () {
        const steps = wrapper.find('li');
        const actual = steps.map(step => step.text());
        let expected = [];

        recipe.steps.forEach(group => {
          expected = [...expected, ...group.list];
        });

        expect(actual).to.deep.equal(expected);
      });

      it('has seperate <ol> tags for each group', function () {
        expect(wrapper.find('ol').length).to.equal(recipe.steps.length);
      });
    });
  });
});
