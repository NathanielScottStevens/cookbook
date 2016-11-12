import React from 'react';
import { shallow } from 'enzyme';
import { expect } from 'meteor/practicalmeteor:chai';
import { describe, it, beforeEach, context } from 'meteor/practicalmeteor:mocha';
import { sinon } from 'meteor/practicalmeteor:sinon';

import getMuiTheme from 'material-ui/styles/getMuiTheme';
import FlatButton from 'material-ui/FlatButton';
import NavigationClose from 'material-ui/svg-icons/navigation/close';

import CustomAppBar from './CustomAppBar';

describe('CustomAppBar', function () {
  const muiTheme = getMuiTheme();
  let wrapper;
  const onMenuChange = sinon.spy();

  function render() {
    return shallow(
      (<CustomAppBar
        onMenuChange={onMenuChange}
      >
        <FlatButton><NavigationClose /></FlatButton>
        <FlatButton><NavigationClose /></FlatButton>
      </CustomAppBar>
     ),
      { context: { muiTheme } }
    );
  }

  context('Rendering', function () {
    beforeEach(function () {
      wrapper = render();
    });

    it('shows children', function () {
      const buttons = wrapper.find('FlatButton');
      expect(buttons.length).to.equal(2);
    });

    it('sends onMenuChange', function () {
      const appBar = wrapper.find('AppBar');
      appBar.prop('onLeftIconButtonTouchTap')();
      expect(onMenuChange).to.have.been.calledOnce;
    });
  });
});
