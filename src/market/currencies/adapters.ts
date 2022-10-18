export function resolveCurrency(amount?: number, smallestUnit = 0.001): number | undefined {
  if (amount === undefined) {
    return undefined;
  }
  return amount * smallestUnit;
}

export function adaptCurrency(amount?: number, smallestUnit = 0.001): number | undefined {
  if (amount === undefined) {
    return undefined;
  }
  return Math.round(amount / smallestUnit);
}

export function formatCurrency(
  amount?: number,
  smallestUnit = 0.001,
  locale = 'fr-FR',
  currency?: string,
  currencySign?: string,
): string {
  const resolvedCurrency = resolveCurrency(amount, smallestUnit);
  if (resolvedCurrency === undefined) {
    return '';
  }
  return new Intl.NumberFormat(locale, { style: 'currency', currency, currencySign }).format(
    resolvedCurrency,
  );
}
