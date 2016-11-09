import Decimal from 'decimal';
import convert from 'convert-units';

function withUom(amount, uom) {
  const options = { exclude: ['in3', 'ft3', 'yd3', 'fl-oz'] };
  const converted = convert(amount).from(uom).toBest(options);


  let [whole, decimal] = (converted.val.toString()).split('.');
  whole = isNaN(whole) ? 0 : Number(whole);
  decimal = isNaN(decimal) ? 0 : Number(decimal);
  let formattedAmount;
  let units = whole > 1 || (whole === 1 && decimal > 0) ? converted.plural : converted.singular;

  if (decimal !== 0) {

    const fraction = new Decimal(`0.${decimal}`).toFraction(10);

    if (whole !== 0) {
      formattedAmount = `${whole} ${fraction[0]}/${fraction[1]}`;
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
    const fraction = new Decimal(`0.${decimal}`).toFraction(10);
    if (whole !== 0) {
      return `${whole} ${fraction[0]}/${fraction[1]}`;
    } else {
      return `${fraction[0]}/${fraction[1]}`;
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
