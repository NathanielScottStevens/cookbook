import React from 'react';
import { shallow } from 'enzyme';
import { expect } from 'meteor/practicalmeteor:chai';
import { describe, it, beforeEach, context } from 'meteor/practicalmeteor:mocha';
import { sinon } from 'meteor/practicalmeteor:sinon';
import getMuiTheme from 'material-ui/styles/getMuiTheme';

import RecipeHeader from './RecipeHeader';
import Recipes from '../../api/recipes/recipes';
import { getTypesArray } from '../../api/recipeTypes/recipeTypes';

describe('RecipeHeader', function () {
  const muiTheme = getMuiTheme();
  let wrapper;
  let recipe;
  let onServingChange;
  let isEditingEnabled;
  let types;
  let onChange;

  function render() {
    return shallow(
      (<RecipeHeader
        title={recipe.name}
        img={recipe.img}
        serves={recipe.serves}
        slug={recipe.slug}
        type={recipe.type}
        onServingChange={onServingChange}
        recipeTypes={types}
        isEditingEnabled={isEditingEnabled}
        onChange={onChange}
      />),
      { context: { muiTheme } }
    );
  }

  context('Basic Rendering', function () {
    beforeEach(function () {
      recipe = Factory.create('simpleRecipe');
      onServingChange = sinon.spy();
      isEditingEnabled = false;
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

    it('does not show edit button', function () {
      const button = wrapper.find('EditButton');
      expect(button).to.have.a.lengthOf(0);
    });
  });

  context('Editing Enabled', function () {
    beforeEach(function () {
      recipe = Factory.create('simpleRecipe');
      onServingChange = sinon.spy();
      isEditingEnabled = true;
      wrapper = render();
    });

    it('shows edit button', function () {
      const button = wrapper.find('EditButton');
      expect(button).to.have.a.lengthOf(1);
    });
  });

  context('In edit mode', function () {
    beforeEach(function () {
      recipe = Factory.create('simpleRecipe');
      onServingChange = sinon.spy();
      isEditingEnabled = true;
      types = getTypesArray();
      onChange = sinon.spy();
      wrapper = render();
      wrapper.find('EditButton').first().simulate('edit');
    });

    it('shows the title', function () {
      const title = wrapper.find('[id="recipe-title"]').first();
      expect(title.prop('value')).to.equal(recipe.name);
    });

    it('shows the title with label', function () {
      const title = wrapper.find('[id="recipe-title"]').first();
      expect(title.prop('floatingLabelText')).to.equal('name');
    });

    it('shows the slug', function () {
      const slug = wrapper.find('[id="recipe-slug"]').first();
      expect(slug.prop('value')).to.equal(recipe.slug);
    });

    it('shows the slug with label', function () {
      const slug = wrapper.find('[id="recipe-slug"]').first();
      expect(slug.prop('floatingLabelText')).to.equal('slug');
    });

    it('shows the serving', function () {
      const serves = wrapper.find('[id="recipe-serves"]').first();
      expect(serves.prop('value')).to.equal(recipe.serves);
    });

    it('shows the serving with label', function () {
      const serves = wrapper.find('[id="recipe-serves"]').first();
      expect(serves.prop('floatingLabelText')).to.equal('serves');
    });

    it('does not showing serving dropdown', function () {
      const dropDown = wrapper.find('[id="serving-selection"]');
      expect(dropDown).to.have.a.lengthOf(0);
    });

    it('shows the type dropdown', function () {
      const type = wrapper.find('[id="recipe-type"]');
      expect(type.length).to.equal(1);
    });

    it('shows the type dropdown with options', function () {
      const type = wrapper.find('[id="recipe-type"]');
      const options = type.find('MenuItem');
      const expected = types.map(t => t.name);
      const valueActual = options.map(opt => opt.prop('value'));
      const textActual = options.map(opt => opt.prop('primaryText'));

      expect(valueActual).to.include.members(expected);
      expect(textActual).to.include.members(expected);
    });

    it('disabled edit mode on clear', function () {
      wrapper.find('EditButton').first().simulate('clear');
      expect(wrapper.state('isEditing')).to.be.false;
    });

    it('resets name field on clear', function () {
      wrapper.find('[id="recipe-title"]').first().simulate('change', null, 'New Name');
      wrapper.find('EditButton').first().simulate('clear');
      expect(wrapper.state('title')).to.equal(recipe.name);
    });

    it('resets serves field on clear', function () {
      wrapper.find('[id="recipe-serves"]').first().simulate('change', null, 'New Name');
      wrapper.find('EditButton').first().simulate('clear');
      expect(wrapper.state('serves')).to.equal(recipe.serves);
    });

    it('resets slug field on clear', function () {
      wrapper.find('[id="recipe-slug"]').first().simulate('change', null, 'New Name');
      wrapper.find('EditButton').first().simulate('clear');
      expect(wrapper.state('slug')).to.equal(recipe.slug);
    });

    it('resets type field on clear', function () {
      wrapper.find('[id="recipe-type"]').first().simulate('change', null, 'New Name');
      wrapper.find('EditButton').first().simulate('clear');
      expect(wrapper.state('type')).to.equal(recipe.type);
    });

    it('calls onChange when saved', function () {
      const expected = {
        title: 'new title',
        serves: 'new serves',
        slug: 'new slug',
        type: 'new type',
      };
      wrapper.find('[id="recipe-title"]').first().simulate('change', null, expected.title);
      wrapper.find('[id="recipe-serves"]').first().simulate('change', null, expected.serves);
      wrapper.find('[id="recipe-slug"]').first().simulate('change', null, expected.slug);
      wrapper.find('[id="recipe-type"]').first().simulate('change', null, expected.type);

      wrapper.find('EditButton').first().simulate('save');

      expect(onChange).to.have.been.calledWith(expected);
    });
  });
});
