export function pad(index: number, padding: number = 2) {
  return String(index).padStart(padding, '0');
};

export function formatNumber(value: number) {
  return new Intl.NumberFormat('en', {
    notation: 'standard',
    minimumFractionDigits: 2,
  }).format(Math.abs(value));
};
