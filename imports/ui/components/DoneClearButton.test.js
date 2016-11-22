import React from 'react';
import { shallow } from 'enzyme';
import { expect } from 'meteor/practicalmeteor:chai';
import { describe, it, beforeEach, context } from 'meteor/practicalmeteor:mocha';
import { sinon } from 'meteor/practicalmeteor:sinon';
import getMuiTheme from 'material-ui/styles/getMuiTheme';

import DoneClearButton from './DoneClearButton';

describe('DoneClearButton', function () {
  let wrapper;
  const muiTheme = getMuiTheme();
  let onClear;
  let onDone;

  function render() {
    return shallow(
      (<DoneClearButton
        onClear={onClear}
        onDone={onDone}
      />),
       { context: { muiTheme } }
    );
  }

  context('Rendering', function () {
    beforeEach(function () {
      onClear = sinon.spy();
      onDone = sinon.spy();
      wrapper = render();
    });

    it('shows clear button', function () {
      const clear = wrapper.find('[data-id="clear-button"]');
      expect(clear).to.have.a.lengthOf(1);
    });

    it('shows done button', function () {
      const done = wrapper.find('[data-id="done-button"]');
      expect(done).to.have.a.lengthOf(1);
    });

    it('calls onClear', function () {
      const clear = wrapper.find('[data-id="clear-button"]').first();
      clear.simulate('click');
      expect(onClear).to.be.calledOnce;
    });

    it('calls onDone', function () {
      const done = wrapper.find('[data-id="done-button"]').first();
      done.simulate('click');
      expect(onDone).to.be.calledOnce;
    });
  });
});
