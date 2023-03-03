export const etherSmallestUnit = 0.0000000000000000001;

export function resolveEtherAmount(amount: number): number {
  return Number((amount * etherSmallestUnit).toFixed(19));
}

export function adaptEtherAmount(amount: number): number {
  return Math.round(amount / etherSmallestUnit);
}

export function formatEtherAmount(
  amount: number,
  decimalDigits = 7,
  displaySymbol = true,
  locale = 'fr-FR',
): string {
  const resolvedAmount = resolveEtherAmount(amount);
  const result = new Intl.NumberFormat(locale, {
    style: 'currency',
    currency: 'ETH',
    minimumFractionDigits: decimalDigits,
  }).format(resolvedAmount);
  if (!displaySymbol) {
    return result.replace(/ETH/i, '').trim();
  }
  return result;
}

export function formatEtherVariation(
  variation: number,
  decimalDigits = 7,
  displaySymbol = true,
  locale = 'fr-FR',
): string {
  const resolvedVariation = resolveEtherAmount(variation);
  const result = new Intl.NumberFormat(locale, {
    style: 'currency',
    currency: 'ETH',
    minimumFractionDigits: decimalDigits,
    signDisplay: 'exceptZero',
  }).format(resolvedVariation);
  if (!displaySymbol) {
    return result.replace(/ETH/i, '').trim();
  }
  return result;
}
