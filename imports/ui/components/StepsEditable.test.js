import React from 'react';
import { shallow } from 'enzyme';
import { expect } from 'meteor/practicalmeteor:chai';
import { describe, it, beforeEach, context } from 'meteor/practicalmeteor:mocha';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import { sinon } from 'meteor/practicalmeteor:sinon';

import StepsEditable from './StepsEditable';
import Recipes from '../../api/recipes/recipes';

describe('StepsEditable', function () {
  const muiTheme = getMuiTheme();
  let wrapper;
  let steps;
  let onChange;
  let onClear;

  function render() {
    return shallow(
      (<StepsEditable
        steps={steps.list}
        label={steps.label}
        onChange={onChange}
        onClear={onClear}
      />),
      { context: { muiTheme } }
    );
  }

  context('Rendering', function () {
    beforeEach(function () {
      steps = Factory.create('simpleRecipe').steps[0];
      onChange = sinon.spy();
      onClear = sinon.spy();
      wrapper = render();
      wrapper.find('EditButton').first().simulate('edit');
    });

    it('shows text fields', function () {
      const fields = wrapper.find('TextField');
      expect(fields).to.have.a.lengthOf(steps.list.length);
    });

    it('shows done clear buttons', function () {
      expect(wrapper.find('DoneClearButton')).to.have.a.lengthOf(1);
    });

    it('calls onChange when done', function () {
      const field = wrapper.find('TextField').first();

      const newText = 'New Text';
      const expectedList = steps.list;
      expectedList[0] = newText;

      field.simulate('change', null, newText);
      wrapper.find('DoneClearButton').first().simulate('done');

      expect(onChange).to.be.calledWith(steps.label, expectedList);
    });

    it('calls onClear when cleared', function () {
      wrapper.find('DoneClearButton').first().simulate('clear');
      expect(onClear).to.be.called;
    });
  });
});
