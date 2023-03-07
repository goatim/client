export const goatimCoinsSmallestUnit = 0.001;

export function resolveGoatimCoinsAmount(amount: number): number {
  return Number((amount * goatimCoinsSmallestUnit).toFixed(3));
}

export function adaptGoatimCoinsAmount(amount: number): number {
  return Math.round(amount / goatimCoinsSmallestUnit);
}

export function formatGoatimCoinsAmount(
  amount: number,
  decimalDigits = 2,
  displaySymbol = true,
  locale = 'fr-FR',
): string {
  const resolvedAmount = resolveGoatimCoinsAmount(amount);
  const result = new Intl.NumberFormat(locale, {
    style: 'currency',
    currency: 'GTC',
    minimumFractionDigits: decimalDigits,
  }).format(resolvedAmount);
  if (!displaySymbol) {
    return result.replace(/GTC/i, '').trim();
  }
  return result;
}

export function formatGoatimCoinsGains(
  gains: number,
  decimalDigits = 2,
  displaySymbol = true,
  locale = 'fr-FR',
): string {
  const resolvedGains = resolveGoatimCoinsAmount(gains);
  const result = new Intl.NumberFormat(locale, {
    style: 'currency',
    currency: 'GTC',
    minimumFractionDigits: decimalDigits,
    signDisplay: 'exceptZero',
  }).format(resolvedGains);
  if (!displaySymbol) {
    return result.replace(/GTC/i, '').trim();
  }
  return result;
}
