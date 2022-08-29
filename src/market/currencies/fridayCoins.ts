import { adaptCurrency, resolveCurrency } from './adapters';

export const fridayCoinsSmallestUnit = 0.0001;

export function resolveFridayCoins(amount?: number): number | undefined {
  return resolveCurrency(amount, fridayCoinsSmallestUnit);
}

export function adaptFridayCoins(amount: number): number | undefined {
  return adaptCurrency(amount, fridayCoinsSmallestUnit);
}

export function formatFridayCoins(amount?: number, decimalDigits = 2): string {
  const resolvedFridayCoins = resolveFridayCoins(amount);
  if (resolvedFridayCoins === undefined) {
    return '';
  }
  return `${resolvedFridayCoins.toFixed(decimalDigits)} FDY`;
}

export function formatFridayCoinsVariation(variation?: number, decimalDigits = 2): string {
  if (variation === undefined) {
    return '';
  }
  if (variation > 0) {
    return `+${formatFridayCoins(variation, decimalDigits)}`;
  }
  return formatFridayCoins(variation, decimalDigits);
}
