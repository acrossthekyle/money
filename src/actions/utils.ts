export function balancize(raw: string) {
  const cleaned = raw.replace(/,/g, '').replace('$', '').trim();
  const number = parseFloat(cleaned);

  return number.toFixed(2);
};

export function interestize(raw: string) {
  const cleaned = raw.replace(/,/g, '').replace('%', '').trim();
  const number = parseFloat(cleaned);

  return number.toFixed(2);
};
