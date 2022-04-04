export function formatPercentage(percentage = 0): string {
  return `${(percentage / 100).toFixed(2)}%`;
}

export function formatVariation(variation = 0): string {
  if (variation > 0) {
    return `+${formatPercentage(variation)}`;
  }
  return formatPercentage(variation);
}

export function resolveCurrency(amount = 0, smallestUnitFactor = 100): number {
  return Math.round(amount * smallestUnitFactor);
}

export function adaptCurrency(amount = 0, smallestUnitFactor = 100): number {
  return amount / smallestUnitFactor;
}

export function formatCurrency(
  amount = 0,
  smallestUnitFactor = 100,
  currency = 'EUR',
  locale = 'fr-FR',
): string {
  return new Intl.NumberFormat(locale, { style: 'currency', currency }).format(
    adaptCurrency(amount, smallestUnitFactor),
  );
}

export const fridayCoinsSmallestUnitFactor = 1000;

export function resolveFridayCoins(amount: number): number {
  return resolveCurrency(amount, fridayCoinsSmallestUnitFactor);
}

export function adaptFridayCoins(amount: number): number {
  return adaptCurrency(amount, fridayCoinsSmallestUnitFactor);
}

export function formatFridayCoins(amount = 0, decimalDigits = 2): string {
  return `${adaptFridayCoins(amount).toFixed(decimalDigits)} FDY`;
}
