export function pad(index: number, padding: number = 2) {
  return String(index).padStart(padding, '0');
};

export function formatNumber(value: number, isCompact?: boolean) {
  return new Intl.NumberFormat('en', {
    notation: isCompact ? 'compact' : 'standard',
    compactDisplay: isCompact ? 'short' : undefined,
    minimumFractionDigits: 2,
  }).format(Math.abs(value));
};
