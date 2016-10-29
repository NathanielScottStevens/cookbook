import React from 'react';
import { shallow } from 'enzyme';
import { sinon } from 'meteor/practicalmeteor:sinon';
import { expect } from 'meteor/practicalmeteor:chai';
import { describe, it, context, beforeEach } from 'meteor/practicalmeteor:mocha';
import getMuiTheme from 'material-ui/styles/getMuiTheme';

import Menu from './Menu';
import Menus from '../../api/menus/menus';

describe('Menu', function () {
  const muiTheme = getMuiTheme();

  function renderMenu(menu) {
    return shallow(
      (<Menu
        menu={menu}
      />),
      { context: { muiTheme } }
    );
  }

  describe('Rendering', function () {
    let wrapper;
    let menu;

    beforeEach(function () {
      menu = Factory.create('menu');
      wrapper = renderMenu(menu);
    });

    it('shows the title', function () {
      const title = wrapper.find('[id="menu-title"]').first();
      expect(title.prop('value')).to.equal(menu.title);
      expect(title.prop('defaultValue')).to.equal(menu.title);
    });

    it('shows the date', function () {
      const title = wrapper.find('DatePicker').first();
      expect(title.prop('value')).to.equal(menu.date);
    });
  });
});
