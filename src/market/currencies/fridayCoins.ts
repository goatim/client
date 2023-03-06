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
  displaySymbol = true,
  locale = 'fr-FR',
): string {
  const resolvedAmount = resolveFridayCoinsAmount(amount);
  const result = new Intl.NumberFormat(locale, {
    style: 'currency',
    currency: 'FDY',
    minimumFractionDigits: decimalDigits,
  }).format(resolvedAmount);
  if (!displaySymbol) {
    return result.replace(/FDY/i, '').trim();
  }
  return result;
}

export function formatFridayCoinsGains(
  gains: number,
  decimalDigits = 2,
  displaySymbol = true,
  locale = 'fr-FR',
): string {
  const resolvedGains = resolveFridayCoinsAmount(gains);
  const result = new Intl.NumberFormat(locale, {
    style: 'currency',
    currency: 'FDY',
    minimumFractionDigits: decimalDigits,
    signDisplay: 'exceptZero',
  }).format(resolvedGains);
  if (!displaySymbol) {
    return result.replace(/FDY/i, '').trim();
  }
  return result;
}
