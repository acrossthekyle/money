import type { Budget } from '@/types';

export function getSubtitle(steps: string[], step: number, budget?: Budget) {
  if (!budget && steps[step] !== 'outline' && (step < steps.length - 1)) {
    return `Step ${step + 1} of ${steps.length - 1}`;
  }

  if (((budget && steps[step] !== 'outline') || (step === steps.length - 1))) {
    return 'Review';
  }

  if (steps[step] === 'outline') {
    return '';
  }

  return '';
};
