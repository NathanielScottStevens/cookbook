import { expect } from 'meteor/practicalmeteor:chai';
import { describe, it, beforeEach } from 'meteor/practicalmeteor:mocha';
import { sinon } from 'meteor/practicalmeteor:sinon';

import { Recipes, recipeSchema, updateRecipe, updateHeader } from './recipes';

describe('Recipes API', function () {
  describe('Schema', function () {
    let validator;

    beforeEach(function () {
      validator = recipeSchema.newContext();
    });

    function validateField(field, value) {
      const obj = {};
      obj[field] = value;
      return validator.validateOne(obj, field);
    }

    it('validates serves', function () {
      expect(validateField('serves', 21)).to.be.true;
      expect(validateField('serves', '21')).to.be.false;
    });

    it('validates img', function () {
      expect(validateField('img', 'pic-one.png')).to.be.true;
      expect(validateField('img', 'pic one.png')).to.be.false;
    });

    it('validates slug', function () {
      expect(validateField('slug', 'recipe-best')).to.be.true;
      expect(validateField('slug', 'recipe best')).to.be.false;
    });

    describe('Update Recipe', function () {
      it('updates', function () {
        const recipe = Factory.create('simpleRecipe');
        recipe.label = 'New label';
        updateRecipe._execute({}, recipe);

        expect(Recipes.findOne(recipe._id).label).to.equal('New label');
      });
    });
  });
});
