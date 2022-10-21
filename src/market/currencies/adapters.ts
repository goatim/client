import { formatFridayCoins } from './fridayCoins';

export function resolveCurrency(amount: number, smallestUnit: number): number {
  return amount * smallestUnit;
}

export function adaptCurrency(amount: number, smallestUnit: number): number {
  return Math.round(amount / smallestUnit);
}

export type FormatCurrencySignDisplay = 'auto' | 'never' | 'always' | 'exceptZero';

export interface FormatCurrencyOptions {
  smallestUnit?: number;
  iso?: string;
  symbol?: string;
  decimalDigits?: number;
  signDisplay?: FormatCurrencySignDisplay;
}

export function formatCurrency(
  amount: number,
  options?: FormatCurrencyOptions,
  locale = 'fr-FR',
): string {
  const resolvedCurrency = resolveCurrency(amount, options?.smallestUnit || 0.01);
  return new Intl.NumberFormat(locale, {
    style: 'currency',
    currency: options?.iso,
    currencySign: options?.symbol,
    minimumFractionDigits: options?.decimalDigits,
    signDisplay: options?.signDisplay,
  }).format(resolvedCurrency);
}
