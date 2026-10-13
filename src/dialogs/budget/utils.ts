import type { Budget } from '@/types';

export function getSubtitle(steps: string[], step: number, budget?: Budget) {
  if (!budget && steps[step] !== 'outline' && (step < steps.length - 1)) {
    return `Step ${step + 1} / ${steps.length}`;
  }

  if (((budget && steps[step] !== 'outline') || (step === steps.length - 1))) {
    return 'Review';
  }

  if (steps[step] === 'outline') {
    return 'Jump to Section';
  }

  return '';
};
