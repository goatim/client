import { adaptCurrency, resolveCurrency } from './adapters';

export const eurosSmallestUnit = 0.01;

export function resolveEuros(amount?: number): number | undefined {
  return resolveCurrency(amount, eurosSmallestUnit);
}

export function adaptEuros(amount: number): number | undefined {
  return adaptCurrency(amount, eurosSmallestUnit);
}

export function formatEuros(amount?: number, decimalDigits = 2): string {
  const resolvedEuros = resolveEuros(amount);
  if (resolvedEuros === undefined) {
    return '';
  }
  return `${resolvedEuros.toFixed(decimalDigits)} €`;
}

export function formatEurosVariation(variation?: number, decimalDigits = 2): string {
  if (variation === undefined) {
    return '';
  }
  if (variation > 0) {
    return `+${formatEuros(variation, decimalDigits)}`;
  }
  return formatEuros(variation, decimalDigits);
}
