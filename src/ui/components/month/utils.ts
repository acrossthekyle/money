const ONES = [
  'zero', 'one', 'two', 'three', 'four',
  'five', 'six', 'seven', 'eight', 'nine',
  'ten', 'eleven', 'twelve', 'thirteen',
  'fourteen', 'fifteen', 'sixteen',
  'seventeen', 'eighteen', 'nineteen',
];

const TENS = [
  ', ', 'twenty', 'thirty', 'forty', 'fifty',
  'sixty', 'seventy', 'eighty', 'ninety',
];

export function toWords(value: number): string {
  if (value === 100) {
    return "one hundred";
  }

  if (value < 20) {
    return ONES[value];
  }

  const remainder = value % 10;

  if (remainder === 0) {
    return TENS[Math.floor(value / 10)];
  }

  return `${TENS[Math.floor(value / 10)]} ${ONES[remainder]}`;
};
