import React from 'react';
import { shallow } from 'enzyme';
import { expect } from 'meteor/practicalmeteor:chai';
import { describe, it, beforeEach, context } from 'meteor/practicalmeteor:mocha';
import { sinon } from 'meteor/practicalmeteor:sinon';
import getMuiTheme from 'material-ui/styles/getMuiTheme';

import RecipeHeaderEditable from './RecipeHeaderEditable';
import Recipes from '../../api/recipes/recipes';
import recipeTypes from '../../api/recipeTypes/fixture';

describe('RecipeHeaderEditable', function () {
  const muiTheme = getMuiTheme();
  let wrapper;
  let recipe;
  let onChange;
  let onClear;

  function render() {
    return shallow(
      (<RecipeHeaderEditable
        title={recipe.label}
        img={recipe.img}
        serves={recipe.serves}
        slug={recipe.slug}
        type={recipe.type.label}
        recipeTypes={recipeTypes}
        onChange={onChange}
        onClear={onClear}
      />),
      { context: { muiTheme } }
    );
  }

  context('Rendering', function () {
    beforeEach(function () {
      recipe = Factory.create('simpleRecipe', {
        type: recipeTypes[2],
      });
      onChange = sinon.spy();
      onClear = sinon.spy();
      wrapper = render();
      wrapper.find('EditButton').first().simulate('edit');
    });

    it('shows the title', function () {
      const title = wrapper.find('[id="recipe-title"]').first();
      expect(title.prop('value')).to.equal(recipe.label);
    });

    it('shows the title with label', function () {
      const title = wrapper.find('[id="recipe-title"]').first();
      expect(title.prop('floatingLabelText')).to.equal('label');
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

    it('shows the type dropdown', function () {
      const type = wrapper.find('[id="recipe-type"]');
      expect(type.length).to.equal(1);
    });

    it('shows the type dropdown with options', function () {
      const type = wrapper.find('[id="recipe-type"]');
      const options = type.find('MenuItem');
      const expected = recipeTypes.map(t => t.label);
      const textActual = options.map(opt => opt.prop('primaryText'));

      expect(textActual).to.include.members(expected);
    });

    it('sets type dropdown to correct value', function () {
      const type = wrapper.find('[id="recipe-type"]');
      const expected = recipeTypes.findIndex(t => t.label === recipe.type.label);
      const actual = type.prop('value');

      expect(actual).to.equal(expected);
    });

    it('shows DoneClearButton', function () {
      const button = wrapper.find('DoneClearButton');
      expect(button).to.have.a.lengthOf(1);
    });

    it('calls onChange with changes when saved', function () {
      const expected = {
        title: 'new title',
        serves: 'new serves',
        slug: 'new slug',
        type: recipeTypes[0].label,
      };
      wrapper.find('[id="recipe-title"]').first().simulate('change', null, expected.title);
      wrapper.find('[id="recipe-serves"]').first().simulate('change', null, expected.serves);
      wrapper.find('[id="recipe-slug"]').first().simulate('change', null, expected.slug);
      wrapper.find('[id="recipe-type"]').first().simulate('change', null, 0);

      wrapper.find('DoneClearButton').first().simulate('done');

      expect(onChange).to.have.been.calledWith(expected);
    });

    it('calls onClear when cleared', function () {
      const button = wrapper.find('DoneClearButton').first();
      button.simulate('clear');
      expect(onClear).to.have.been.called;
    });
  });
});
