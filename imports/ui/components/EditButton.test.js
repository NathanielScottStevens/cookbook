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
  let isEditing = true;
  let onEdit;
  let onClear;
  let onSave;

  function render() {
    return shallow(
      (<EditButton
        isEditing={isEditing}
        onEdit={onEdit}
        onClear={onClear}
        onSave={onSave}
      />),
       { context: { muiTheme } }
    );
  }

  context('Editing', function () {
    beforeEach(function () {
      onEdit = sinon.spy();
      onClear = sinon.spy();
      onSave = sinon.spy();
      isEditing = true;
      wrapper = render();
    });

    it('shows edit button', function () {
      const edit = wrapper.find('[data-id="edit-button"]');
      expect(edit).to.have.a.lengthOf(0);
    });

    it('does not show clear button', function () {
      const clear = wrapper.find('[data-id="clear-button"]');
      expect(clear).to.have.a.lengthOf(1);
    });

    it('does not show done button', function () {
      const done = wrapper.find('[data-id="done-button"]');
      expect(done).to.have.a.lengthOf(1);
    });

    it('calls onClear', function () {
      const clear = wrapper.find('[data-id="clear-button"]').first();
      clear.simulate('click');
      expect(onClear).to.be.calledOnce;
    });

    it('calls onSave', function () {
      const done = wrapper.find('[data-id="done-button"]').first();
      done.simulate('click');
      expect(onSave).to.be.calledOnce;
    });
  });

  context('Not Editing', function () {
    beforeEach(function () {
      onEdit = sinon.spy();
      onClear = sinon.spy();
      onSave = sinon.spy();
      isEditing = false;
      wrapper = render();
    });

    it('does not show edit button', function () {
      const edit = wrapper.find('[data-id="edit-button"]');
      expect(edit).to.have.a.lengthOf(1);
    });

    it('shows clear button', function () {
      const clear = wrapper.find('[data-id="clear-button"]');
      expect(clear).to.have.a.lengthOf(0);
    });

    it('shows done button', function () {
      const done = wrapper.find('[data-id="done-button"]');
      expect(done).to.have.a.lengthOf(0);
    });

    it('calls onEdit', function () {
      const edit = wrapper.find('[data-id="edit-button"]').first();
      edit.simulate('click');
      expect(onEdit).to.be.calledOnce;
    });
  });
});
