import React from 'react';
import { shallow } from 'enzyme';
import { expect } from 'meteor/practicalmeteor:chai';
import { describe, it, beforeEach, context } from 'meteor/practicalmeteor:mocha';
import { sinon } from 'meteor/practicalmeteor:sinon';
import getMuiTheme from 'material-ui/styles/getMuiTheme';

import EditButton from './EditButton';

describe('EditButton', function () {
  let wrapper;
  const muiTheme = getMuiTheme();
  const style = { top: 50, left: 60 };
  let onClick;

  function render() {
    return shallow(
      (<EditButton
        onClick={onClick}
        style={style}
      />),
       { context: { muiTheme } }
    );
  }

  context('Rendering', function () {
    beforeEach(function () {
      onClick = sinon.spy();
      wrapper = render();
    });

    it('shows edit button', function () {
      const edit = wrapper.find('[data-id="edit-button"]');
      expect(edit).to.have.a.lengthOf(1);
    });

    it('calls onClick', function () {
      const edit = wrapper.find('[data-id="edit-button"]').first();
      edit.simulate('click');
      expect(onClick).to.be.calledOnce;
    });

    it('passes style to FlatButton', function () {
      expect(wrapper.find('FlatButton').prop('style'))
        .to.deep.equal(style);
    });
  });
});
