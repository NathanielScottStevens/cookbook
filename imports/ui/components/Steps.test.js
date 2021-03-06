import React from 'react';
import { shallow } from 'enzyme';
import { expect } from 'meteor/practicalmeteor:chai';
import { describe, it, beforeEach, context } from 'meteor/practicalmeteor:mocha';
import getMuiTheme from 'material-ui/styles/getMuiTheme';

import Steps from './Steps';
import Recipes from '../../api/recipes/recipes';

describe('Steps', function () {
  const muiTheme = getMuiTheme();
  let wrapper;
  let steps;

  function render() {
    return shallow(
      (<Steps
        steps={steps.list}
        label={steps.label}
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
});
