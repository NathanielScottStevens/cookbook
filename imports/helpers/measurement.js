import Fraction from 'fractions';
import convert from 'convert-units';

function withUom(amount, uom) {
  let converted;
  if (uom === 'tsp' && amount >= 3) {
    converted = { val: convert(amount).from(uom).to('Tbs'), singular: 'Tablespoon', plural: 'Tablespoons' };
  } else {
    converted = convert(amount).from(uom).toBest();
  }

  let [whole, decimal] = (converted.val.toString()).split('.');
  whole = isNaN(whole) ? 0 : Number(whole);
  decimal = isNaN(decimal) ? 0 : Number(decimal);
  let formattedAmount;
  let units = whole > 1 || (whole === 1 && decimal > 0) ? converted.plural : converted.singular;

  if (decimal !== 0) {

    const fraction = new Fraction(`0.${decimal}`).toString();

    if (whole !== 0) {
      formattedAmount = `${whole} ${fraction}`;
    } else {
      formattedAmount = fraction;
    }
  } else {
    formattedAmount = whole;
  }

  return `${formattedAmount} ${units}`;
}

function withoutUom(amount) {
  let [whole, decimal] = (amount.toString()).split('.');
  whole = isNaN(whole) ? 0 : Number(whole);
  decimal = isNaN(decimal) ? 0 : Number(decimal);

  if (decimal !== 0) {
    const fraction = new Fraction(`0.${decimal}`).toString();
    if (whole !== 0) {
      return `${whole} ${fraction}`;
    } else {
      return fraction.toString();
    }
  } else {
    return whole.toString();
  }
}

export default function getMeasurementLabel(amount, uom) {
  if (uom) {
    return withUom(amount, uom);
  } else {
    return withoutUom(amount);
  }
}
