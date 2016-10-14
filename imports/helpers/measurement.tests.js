import { describe, it, context } from 'meteor/practicalmeteor:mocha';
import { expect } from 'meteor/practicalmeteor:chai';

import getMeasurementLabel from './measurement';

describe('getMeasurementLabel', function () {
  it('"2" returns no fraction', function () {
    const amount = 2;
    const uom = 'pnt';
    const expected = `${amount} ${uom}`;

    const result = getMeasurementLabel(amount, uom);

    expect(result).to.equal(expected);
  });

  it('"2.0" returns no fraction', function () {
    const amount = '2.0';
    const uom = 'pnt';
    const expected = `2 ${uom}`;

    const result = getMeasurementLabel(amount, uom);

    expect(result).to.equal(expected);
  })

  it('returns fraction 1/2', function () {
    const amount = 1.5;
    const uom = 'pnt';
    const expected = `1 1/2 ${uom}`;

    const result = getMeasurementLabel(amount, uom);

    expect(result).to.equal(expected);
  });

  it('returns fraction 1/4', function () {
    const amount = 1.25;
    const uom = 'pnt';
    const expected = `1 1/4 ${uom}`;

    const result = getMeasurementLabel(amount, uom);

    expect(result).to.equal(expected);
  });

  it('returns fraction 1/16', function () {
    const amount = 100.0625;
    const uom = 'pnt';
    const expected = `100 1/16 ${uom}`;

    const result = getMeasurementLabel(amount, uom);

    expect(result).to.equal(expected);
  });

  it('rounds up with bad rounding math', function () {
    const amount = 1.2499999999999999999;
    const uom = 'pnt';
    const expected = `1 1/4 ${uom}`;

    const result = getMeasurementLabel(amount, uom);

    expect(result).to.equal(expected);
  });

  it('rounds down with bad rounding math', function () {
    const amount = 1.250000000000000000001;
    const uom = 'pnt';
    const expected = `1 1/4 ${uom}`;

    const result = getMeasurementLabel(amount, uom);

    expect(result).to.equal(expected);
  });
});
