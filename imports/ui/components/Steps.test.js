import React from 'react';
import { shallow } from 'enzyme';
import { expect } from 'meteor/practicalmeteor:chai';
import { describe, it, beforeEach, context } from 'meteor/practicalmeteor:mocha';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import { sinon } from 'meteor/practicalmeteor:sinon';

import Steps from './Steps';
import Recipes from '../../api/recipes/recipes';

describe('Steps', function () {
  const muiTheme = getMuiTheme();
  let wrapper;
  let steps;
  let isEditingEnabled = false;
  let onChange;

  function render() {
    return shallow(
      (<Steps
        steps={steps.list}
        label={steps.label}
        isEditingEnabled={isEditingEnabled}
        onChange={onChange}
      />),
      { context: { muiTheme } }
    );
  }

  context('Rendering', function () {
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

    it('does not show edit button', function () {
      const button = wrapper.find('EditButton');
      expect(button).to.have.a.lengthOf(0);
    });
  });

  context('With no label', function () {
    beforeEach(function () {
      steps = Factory.create('simpleRecipe').steps[0];
      wrapper = render();
    });

    it('does not show label', function () {
      const h3 = wrapper.find('h3');
      expect(h3.length).to.equal(0);
    });
  });

  context('Editing Enabled', function () {
    it('shows edit button', function () {
      steps = Factory.create('simpleRecipe').steps[0];
      isEditingEnabled = true;
      wrapper = render();
      const button = wrapper.find('EditButton');
      expect(button).to.have.a.lengthOf(1);
    });
  });

  context('Edit Mode', function () {
    beforeEach(function () {
      steps = Factory.create('simpleRecipe').steps[0];
      isEditingEnabled = true;
      onChange = sinon.spy();
      wrapper = render();
      wrapper.find('EditButton').first().simulate('edit');
    });

    it('shows text fields', function () {
      const fields = wrapper.find('TextField');
      expect(fields).to.have.a.lengthOf(steps.list.length);
    });

    it('calls onChange when saved', function () {
      const field = wrapper.find('TextField').first();

      const newText = 'New Text';
      const expectedList = steps.list;
      expectedList[0] = newText;

      field.simulate('change', null, newText);
      wrapper.find('EditButton').first().simulate('save');

      expect(onChange).to.be.calledWith(steps.label, expectedList);
    });

    it('resets step fields when cleared', function () {
      const field = wrapper.find('TextField').first();

      field.simulate('change', null, 'New Text');
      wrapper.find('EditButton').first().simulate('clear');

      expect(wrapper.state('steps')[0]).to.equal(steps.list[0]);
    });
  });
});
