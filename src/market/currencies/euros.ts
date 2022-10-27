export const eurosSmallestUnit = 0.01;

export function resolveEurosAmount(amount: number): number {
  return amount * eurosSmallestUnit;
}

export function adaptEurosAmount(amount: number): number {
  return Math.round(amount / eurosSmallestUnit);
}

export function formatEurosAmount(amount: number, decimalDigits = 2, locale = 'fr-FR'): string {
  const resolvedAmount = resolveEurosAmount(amount);
  return new Intl.NumberFormat(locale, {
    style: 'currency',
    currency: 'EUR',
    minimumFractionDigits: decimalDigits,
  }).format(resolvedAmount);
}

export function formatEurosVariation(
  variation: number,
  decimalDigits = 2,
  locale = 'fr-FR',
): string {
  const resolvedVariation = resolveEurosAmount(variation);
  return new Intl.NumberFormat(locale, {
    style: 'currency',
    currency: 'EUR',
    minimumFractionDigits: decimalDigits,
    signDisplay: 'exceptZero',
  }).format(resolvedVariation);
}
