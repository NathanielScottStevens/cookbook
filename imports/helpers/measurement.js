import Fraction from 'fractions';

export default function getMeasurementLabel(amount, uom) {
  let [whole, decimal] = (amount + '').split('.');
  let formattedAmount = whole;

  if (decimal !== undefined && Number(decimal) !== 0) {
    const fraction = new Fraction(`0.${decimal}`).toString();
    formattedAmount += ` ${fraction}`;
  }

  return `${formattedAmount} ${uom}`;
}
