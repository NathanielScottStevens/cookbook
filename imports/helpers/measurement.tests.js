import { describe, it, context } from 'meteor/practicalmeteor:mocha';
import { expect } from 'meteor/practicalmeteor:chai';

import getMeasurementLabel from './measurement';

describe('getMeasurementLabel', function () {

  it('"1" returns no fraction', function () {
    const amount = 1;
    const expected = '1';

    const result = getMeasurementLabel(amount);

    expect(result).to.equal(expected);
  });

  it('"1.0" returns no fraction', function () {
    const amount = '1.0';
    const expected = '1';

    const result = getMeasurementLabel(amount);

    expect(result).to.equal(expected);
  });

  it('returns fraction 1/2', function () {
    const amount = 0.5;
    const expected = '1/2';

    const result = getMeasurementLabel(amount);

    expect(result).to.equal(expected);
  });

  it('returns fraction 1/4', function () {
    const amount = 0.25;
    const expected = '1/4';

    const result = getMeasurementLabel(amount);

    expect(result).to.equal(expected);
  });

  it('rounds up with bad rounding math', function () {
    const amount = 0.24999999;
    const expected = '1/4';

    const result = getMeasurementLabel(amount);

    expect(result).to.equal(expected);
  });

  it('rounds down with bad rounding math', function () {
    const amount = 0.250000001;
    const expected = '1/4';

    const result = getMeasurementLabel(amount);

    expect(result).to.equal(expected);
  });

  it('return plural unit of measure', function () {
    const amount = 2;
    const expected = '2';

    const result = getMeasurementLabel(amount);

    expect(result).to.equal(expected);
  });

  it('convert measurement up to best uom', function () {
    const amount = 48;
    const uom = 'tsp';
    const expected = '1 Cup';

    const result = getMeasurementLabel(amount, uom);

    expect(result).to.equal(expected);
  });

  it('handles 1/3', function () {
    const amount = 0.3333333333;
    const expected = '1/3';

    const result = getMeasurementLabel(amount);

    expect(result).to.equal(expected);
  });

  it('handles 2/3', function () {
    const amount = 0.666666666;
    const expected = '2/3';

    const result = getMeasurementLabel(amount);

    expect(result).to.equal(expected);
  });

  it('teaspoon does not get converted to cubic inches', function () {
    const amount = 4;
    const uom = 'tsp';
    const expected = '1 1/3 Tablespoon';

    const result = getMeasurementLabel(amount, uom);

    expect(result).to.equal(expected);
  });
});
