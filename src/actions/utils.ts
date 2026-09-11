export function balancize(raw: string) {
  const cleaned = raw.replace(/,/g, '').replace('$', '').trim();
  const number = parseFloat(cleaned);

  return number.toFixed(2);
};

export function interestize(raw: string) {
  const isNegative = raw.includes('-');
  const cleaned = raw
    .replace(/,/g, '')
    .replace('%', '')
    .replace('-', '').trim();

  if (cleaned === '') {
    return '';
  }

  const number = parseFloat(cleaned);

  return `${isNegative ? '-' : ''}${number.toFixed(2)}`;
};
