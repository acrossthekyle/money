import type { Holding } from '@/types';

export function getHeaders(type: string) {
  if (type === 'credit_card') {
    return {
      balance: `What's the card's current balance?`,
      name: `Enter a name for the credit card.`,
      number: `Enter the last 4 numbers of the credit card.`,
      rate: undefined,
    };
  }

  if (type === 'savings') {
    return {
      balance: `How much is in this savings account?`,
      name: `Enter a name for the savings account.`,
      number: `Enter the last 4 numbers of the savings account.`,
      rate: `What's the savings account interest rate?`,
    };
  }

  if (type === 'checking') {
    return {
      balance: `What's the checking account balance?`,
      name: `Enter a name for the checking account.`,
      number: `Enter the last 4 numbers of the checking account.`,
      rate: `What's the checking account interest rate?`,
    };
  }

  if (type === 'retirement') {
    return {
      balance: `How much is in this retirement account?`,
      name: `Enter a name for the retirement holding.`,
      number: `Enter the last 4 numbers of the retirement account.`,
      rate: `What's the projected retirement account rate of appreciation?`,
    };
  }

  if (type === 'property') {
    return {
      balance: `What's the property/asset currently worth?`,
      name: `Enter a name for the property/asset.`,
      number: ``,
      rate: `What's the anticipated rate of apprecation for the property/asset?`,
    };
  }

  return {
    balance: ``,
    name: ``,
    number: ``,
    rate: ``,
  };
}


export function getPlaceholder(type: string) {
  if (type === 'credit_card') {
    return 'Eg. Platinum Gold Express';
  }

  if (type === 'savings') {
    return 'Eg. 360 Performance';
  }

  if (type === 'checking') {
    return 'Eg. Premier Plus';
  }

  if (type === 'retirement') {
    return 'Eg. 401k';
  }

  if (type === 'property') {
    return 'Eg. Toyota Camry';
  }

  return '';
};

export function getSubtitle(steps: string[], step: number, holding?: Holding) {
  if (!holding && steps[step] !== 'outline' && (step < steps.length - 1)) {
    return `Step ${step + 1} / ${steps.length}`;
  }

  if (((holding && steps[step] !== 'outline') || (step === steps.length - 1))) {
    return 'Review';
  }

  if (steps[step] === 'outline') {
    return 'Jump to Section';
  }

  return '';
};
