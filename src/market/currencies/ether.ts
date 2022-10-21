import {
  adaptCurrency,
  formatCurrency,
  FormatCurrencySignDisplay,
  resolveCurrency,
} from './adapters';

export const etherSmallestUnit = 0.001;

export function resolveEther(amount: number): number {
  return resolveCurrency(amount, etherSmallestUnit);
}

export function adaptEther(amount: number): number {
  return adaptCurrency(amount, etherSmallestUnit);
}

export function formatEther(
  amount: number,
  decimalDigits = 2,
  signDisplay: FormatCurrencySignDisplay = 'auto',
): string {
  return formatCurrency(amount, {
    smallestUnit: etherSmallestUnit,
    iso: 'ETH',
    decimalDigits,
    signDisplay,
  });
}

export function formatEtherVariation(variation: number, decimalDigits = 2): string {
  return formatEther(variation, decimalDigits, 'exceptZero');
}
