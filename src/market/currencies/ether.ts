export const etherSmallestUnit = 0.001;

export function resolveEtherAmount(amount: number): number {
  return amount * etherSmallestUnit;
}

export function adaptEtherAmount(amount: number): number {
  return Math.round(amount / etherSmallestUnit);
}

export function formatEtherAmount(amount: number, decimalDigits = 6, locale = 'fr-FR'): string {
  const resolvedAmount = resolveEtherAmount(amount);
  return new Intl.NumberFormat(locale, {
    style: 'currency',
    currency: 'ETH',
    minimumFractionDigits: decimalDigits,
  }).format(resolvedAmount);
}

export function formatEtherVariation(
  variation: number,
  decimalDigits = 6,
  locale = 'fr-FR',
): string {
  const resolvedVariation = resolveEtherAmount(variation);
  return new Intl.NumberFormat(locale, {
    style: 'currency',
    currency: 'ETH',
    minimumFractionDigits: decimalDigits,
    signDisplay: 'exceptZero',
  }).format(resolvedVariation);
}
