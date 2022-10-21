import {
  adaptCurrency,
  formatCurrency,
  FormatCurrencySignDisplay,
  resolveCurrency,
} from './adapters';

export const fridayCoinsSmallestUnit = 0.001;

export function resolveFridayCoins(amount: number): number {
  return resolveCurrency(amount, fridayCoinsSmallestUnit);
}

export function adaptFridayCoins(amount: number): number {
  return adaptCurrency(amount, fridayCoinsSmallestUnit);
}

export function formatFridayCoins(
  amount: number,
  decimalDigits = 2,
  signDisplay: FormatCurrencySignDisplay = 'auto',
): string {
  return formatCurrency(amount, {
    smallestUnit: fridayCoinsSmallestUnit,
    iso: 'FDY',
    symbol: 'FDY',
    decimalDigits,
    signDisplay,
  });
}

export function formatFridayCoinsVariation(variation: number, decimalDigits = 2): string {
  return formatFridayCoins(variation, decimalDigits, 'exceptZero');
}
