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

      it('shows no subheaders', function () {
        const actual = wrapper.find('Subheader');

        expect(actual.length).to.equal(0);
      });
    });
  });
});
