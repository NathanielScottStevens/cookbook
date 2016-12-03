import React from 'react';
import { shallow } from 'enzyme';
import { expect } from 'meteor/practicalmeteor:chai';
import { describe, it, beforeEach, context } from 'meteor/practicalmeteor:mocha';
import { sinon } from 'meteor/practicalmeteor:sinon';
import getMuiTheme from 'material-ui/styles/getMuiTheme';

import StepsGroup from './StepsGroup';
import Recipes from '../../api/recipes/recipes';

describe('StepsGroup', function () {
  const muiTheme = getMuiTheme();
  let wrapper;
  let steps;
  let onChange;

  function render() {
    return shallow(
      (<StepsGroup
        steps={steps}
        onChange={onChange}
      />),
      { context: { muiTheme } }
    );
  }

  context('Rendering', function () {
    beforeEach(function () {
      steps = Factory.create('complexRecipe').steps;
      wrapper = render();
    });

    it('shows correct number of Steps', function () {
      const subject = wrapper.find('Steps');
      expect(subject).to.have.a.lengthOf(steps.length);
    });

    it('shows correct number of EditButtons', function () {
      const subject = wrapper.find('EditButton');
      expect(subject).to.have.a.lengthOf(steps.length);
    });
  });

  context('Editing', function () {
    beforeEach(function () {
      steps = Factory.create('complexRecipe').steps;
      onChange = sinon.spy();
      wrapper = render();
      wrapper.find('[data-id="steps-edit-0"]').simulate('click');
    });

    it('shows correct number of StepsEditable', function () {
      const subject = wrapper.find('StepsEditable');
      expect(subject).to.have.a.lengthOf(1);
    });

    it('passes correct props', function () {
      const subject = wrapper.find('StepsEditable');
      expect(subject.prop('label'), 'label').to.equal(steps[0].label);
      expect(subject.prop('steps'), 'steps').to.include.members(steps[0].list);
      expect(subject.prop('onChange'), 'onChange').to.exist;
      expect(subject.prop('onClear'), 'onClear').to.exist;
    });

    it('disables editing onClear', function () {
      wrapper.find('StepsEditable').simulate('clear');
      const subject = wrapper.find('StepsEditable');
      expect(subject).to.have.a.lengthOf(0);
    });

    it('calls onChange with index and new value', function () {
      const subject = wrapper.find('StepsEditable').first();
      subject.simulate('change', steps[0]);
      expect(onChange).to.be.calledWith(0, steps[0]);
    });
  });
});
