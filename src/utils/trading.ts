export function formatPercentage(percentage = 0): string {
  return `${(percentage / 100).toFixed(2)}%`;
}

export function formatPercentageVariation(variation = 0): string {
  if (variation > 0) {
    return `+${formatPercentage(variation)}`;
  }
  return formatPercentage(variation);
}

export function resolveCurrency(amount?: number, smallestUnitFactor = 100): number | undefined {
  if (amount === undefined) {
    return undefined;
  }
  return amount / smallestUnitFactor;
}

export function adaptCurrency(amount?: number, smallestUnitFactor = 100): number | undefined {
  if (amount === undefined) {
    return undefined;
  }
  return Math.round(amount * smallestUnitFactor);
}

export function formatCurrency(
  amount?: number,
  smallestUnitFactor = 100,
  currency = 'EUR',
  locale = 'fr-FR',
): string {
  const resolvedCurrency = resolveCurrency(amount, smallestUnitFactor);
  if (resolvedCurrency === undefined) {
    return '';
  }
  return new Intl.NumberFormat(locale, { style: 'currency', currency }).format(resolvedCurrency);
}

export const fridayCoinsSmallestUnitFactor = 1000;

export function resolveFridayCoins(amount?: number): number | undefined {
  return resolveCurrency(amount, fridayCoinsSmallestUnitFactor);
}

export function adaptFridayCoins(amount: number): number | undefined {
  return adaptCurrency(amount, fridayCoinsSmallestUnitFactor);
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
