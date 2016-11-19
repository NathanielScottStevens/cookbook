import React from 'react';
import { shallow } from 'enzyme';
import { expect } from 'meteor/practicalmeteor:chai';
import { describe, it, beforeEach, context } from 'meteor/practicalmeteor:mocha';
import { sinon } from 'meteor/practicalmeteor:sinon';
import getMuiTheme from 'material-ui/styles/getMuiTheme';

import RecipeHeader from './RecipeHeader';
import Recipes from '../../api/recipes/recipes';

describe('RecipeHeader', function () {
  const muiTheme = getMuiTheme();
  let wrapper;
  let recipe;
  let onServingChange;

  function render() {
    return shallow(
      (<RecipeHeader
        title={recipe.name}
        img={recipe.img}
        serves={recipe.serves}
        onServingChange={onServingChange}
      />),
      { context: { muiTheme } }
    );
  }

  context('Basic Rendering', function () {
    beforeEach(function () {
      recipe = Factory.create('simpleRecipe');
      onServingChange = sinon.spy();
      wrapper = render();
    });

    it('shows title', function () {
      const h1 = wrapper.find('h1');
      expect(h1.text()).to.equal(recipe.name);
    });

    it('shows image', function () {
      const img = wrapper.find('FramedImage').first();
      const expected = `/../../images/${recipe.img}`;
      expect(img.prop('img')).to.equal(expected);
    });

    it('shows serving dropdown', function () {
      const dropDown = wrapper.find('[id="serving-selection"]');
      expect(dropDown).to.have.a.lengthOf(1);
    });

    it('serving dropdown shows correct first option', function () {
      const dropDown = wrapper.find('[id="serving-selection"]');
      const items = dropDown.find('MenuItem');
      expect(items.first().prop('primaryText')).to.equal(recipe.serves);
    });

    it('serving dropdown multiplies by serving amount', function () {
      const dropDown = wrapper.find('[id="serving-selection"]');
      const items = dropDown.find('MenuItem');
      expect(items.at(1).prop('primaryText')).to.equal(recipe.serves * 2);
    });

    it('calls onServingChange', function () {
      const dropDown = wrapper.find('[id="serving-selection"]').first();
      dropDown.simulate('change', null, 1, 2);
      expect(onServingChange).to.be.calledWith(2);
    });

    it('maintains serving dropdown selection state', function () {
      const dropDown = wrapper.find('[id="serving-selection"]').first();
      dropDown.simulate('change', null, 5, 6);
      expect(wrapper.state('servingSelection')).to.equal(6);
    });
  });
});
