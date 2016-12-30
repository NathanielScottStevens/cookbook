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

  describe('Rendering', function () {
    context('No Label', function () {
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

      it('does not show label', function () {
        const subject = wrapper.find('[id="label"]');
        expect(subject).to.have.a.lengthOf(0);
      });

      it('shows done clear buttons', function () {
        expect(wrapper.find('DoneClearButton')).to.have.a.lengthOf(1);
      });

      it('calls onChange with steps when done', function () {
        const field = wrapper.find('TextField').first();

        const newText = 'New Text';
        const expectedList = steps.list;
        expectedList[0] = newText;

        field.simulate('change', null, newText);
        wrapper.find('DoneClearButton').first().simulate('done');

        expect(onChange).to.be.calledWith({
          label: steps.label,
          list: expectedList,
        });
      });

      it('calls onClear when cleared', function () {
        wrapper.find('DoneClearButton').first().simulate('clear');
        expect(onClear).to.be.called;
      });

      it('shows add step button', function () {
        expect(wrapper.find('[data-id="add-step"]'))
          .to.have.a.lengthOf(1);
      });

      it('adds a step when clicked', function () {
        wrapper.find('[data-id="add-step"]').first()
          .simulate('click');

        expect(wrapper.find('ListItem'))
          .to.have.a.lengthOf(steps.list.length + 1);
      });

      it('shows delete buttons', function () {
        expect(wrapper.find('[data-id="delete-button"]'))
          .to.have.a.lengthOf(steps.list.length);
      });

      it('removes step onDelete', function () {
        const originalFirstStep = wrapper.find('[data-id="step-text"]').first();
        wrapper.find('[data-id="delete-button"]').first()
          .simulate('click');

        expect(wrapper.find('[data-id="step-text"]').first())
          .to.not.deep.equal(originalFirstStep);
      });
    });

    context('With Label', function () {
      beforeEach(function () {
        steps = Factory.create('complexRecipe').steps[0];
        onChange = sinon.spy();
        onClear = sinon.spy();
        wrapper = render();
        wrapper.find('EditButton').first().simulate('edit');
      });

      it('shows label', function () {
        const subject = wrapper.find('[id="label"]').first();
        expect(subject.prop('value')).to.equal(steps.label);
      });

      it('calls onChange with label when done', function () {
        const label = wrapper.find('[id="label"]').first();
        const newText = 'New Label';

        label.simulate('change', null, newText);
        wrapper.find('DoneClearButton').first().simulate('done');

        expect(onChange).to.be.calledWith({
          label: newText,
          list: steps.list,
        });
      });
    });
  });
});
