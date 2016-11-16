import React from 'react';
import { shallow } from 'enzyme';
import { expect } from 'meteor/practicalmeteor:chai';
import { describe, it, beforeEach, context } from 'meteor/practicalmeteor:mocha';
import { sinon } from 'meteor/practicalmeteor:sinon';
import getMuiTheme from 'material-ui/styles/getMuiTheme';

import Steps from './Steps';
import Recipes from '../../api/recipes/recipes';

describe('IngredientTableRow', function () {
  const muiTheme = getMuiTheme();
  let wrapper;
  let steps;
  let isEditing;
  let onAddStep;

  function render() {
    return shallow(
      (<Steps
        steps={steps.list}
        label={steps.label}
        isEditing={isEditing}
        onAddStep={onAddStep}
      />),
      { context: { muiTheme } }
    );
  }

  context('with label', function () {
    beforeEach(function () {
      steps = Factory.create('complexRecipe').steps[0];
      wrapper = render();
    });

    it('shows steps', function () {
      const lis = wrapper.find('li');
      const actual = lis.map(l => l.text());
      expect(actual).to.include.members(steps.list);
    });

    it('shows label', function () {
      const h3 = wrapper.find('h3').first();
      expect(h3.text()).to.equal(steps.label);
    });

    it('shows as an ordered list', function () {
      const ol = wrapper.find('ol');
      expect(ol.length).to.equal(1);
    });
  });

  context('with no label', function () {
    beforeEach(function () {
      steps = Factory.create('simpleRecipe').steps[0];
      wrapper = render();
    });

    it('does not show label', function () {
      const h3 = wrapper.find('h3');
      expect(h3.length).to.equal(0);
    });
  });

  context('in edit mode', function () {
    beforeEach(function () {
      steps = Factory.create('simpleRecipe').steps[0];
      isEditing = true;
      onAddStep = sinon.spy();
      wrapper = render();
    });

    it('shows text fields', function () {
      const fields = wrapper.find('TextField');
      expect(fields).to.have.a.lengthOf(steps.list.length);
    });

    it('shows button for adding a step', function () {
      const button = wrapper.find('[data-id="add-step"]');
      expect(button).to.have.a.lengthOf(1);
    });

    it('calls onAddStep when add step is clicked', function () {
      const button = wrapper.find('[data-id="add-step"]');
      button.first().simulate('click');
      expect(onAddStep).to.have.been.calledOnce;
    });
  });
});
