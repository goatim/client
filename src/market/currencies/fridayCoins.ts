export const fridayCoinsSmallestUnit = 0.001;

export function resolveFridayCoinsAmount(amount: number): number {
  return Number((amount * fridayCoinsSmallestUnit).toFixed(3));
}

export function adaptFridayCoinsAmount(amount: number): number {
  return Math.round(amount / fridayCoinsSmallestUnit);
}

export function formatFridayCoinsAmount(
  amount: number,
  decimalDigits = 2,
  locale = 'fr-FR',
): string {
  const resolvedAmount = resolveFridayCoinsAmount(amount);
  return new Intl.NumberFormat(locale, {
    style: 'currency',
    currency: 'FDY',
    minimumFractionDigits: decimalDigits,
  }).format(resolvedAmount);
}

export function formatFridayCoinsVariation(
  variation: number,
  decimalDigits = 2,
  locale = 'fr-FR',
): string {
  const resolvedVariation = resolveFridayCoinsAmount(variation);
  return new Intl.NumberFormat(locale, {
    style: 'currency',
    currency: 'FDY',
    minimumFractionDigits: decimalDigits,
    signDisplay: 'exceptZero',
  }).format(resolvedVariation);
}
