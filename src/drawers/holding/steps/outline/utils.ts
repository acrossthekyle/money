export function getInterestName(type: string) {
  if (type === 'savings' || type === 'checking') {
    return 'Interest rate';
  }

  if (type === 'retirement') {
    return 'Appreciation rate';
  }

  if (type === 'property') {
    return 'Appreciation/Depreciation rate';
  }

  return '';
};
