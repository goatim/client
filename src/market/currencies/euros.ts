import {
  adaptCurrency,
  formatCurrency,
  FormatCurrencySignDisplay,
  resolveCurrency,
} from './adapters';

export const eurosSmallestUnit = 0.01;

export function resolveEuros(amount: number): number | undefined {
  return resolveCurrency(amount, eurosSmallestUnit);
}

export function adaptEuros(amount: number): number | undefined {
  return adaptCurrency(amount, eurosSmallestUnit);
}

export function formatEuros(
  amount: number,
  decimalDigits = 2,
  signDisplay: FormatCurrencySignDisplay = 'auto',
): string {
  return formatCurrency(amount, {
    smallestUnit: eurosSmallestUnit,
    iso: 'EUR',
    decimalDigits,
    signDisplay,
  });
}

export function formatEurosVariation(variation: number, decimalDigits = 2): string {
  return formatEuros(variation, decimalDigits, 'exceptZero');
}
