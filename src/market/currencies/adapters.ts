import { formatFridayCoinsAmount, formatFridayCoinsVariation } from './fridayCoins';
import { formatEtherAmount, formatEtherVariation } from './ether';
import { formatEurosAmount, formatEurosVariation } from './euros';

export function formatCurrencyAmount(
  amount: number,
  iso = 'EUR',
  decimalDigits?: number,
  displaySymbol = true,
  locale = 'fr-FR',
): string {
  switch (iso) {
    case 'FDY':
      return formatFridayCoinsAmount(amount, decimalDigits, displaySymbol, locale);
    case 'ETH':
      return formatEtherAmount(amount, decimalDigits, displaySymbol, locale);
    case 'EUR':
      return formatEurosAmount(amount, decimalDigits, locale);
    default:
      return new Intl.NumberFormat(locale, {
        style: 'currency',
        currency: iso,
        minimumFractionDigits: decimalDigits,
      }).format(amount);
  }
}

export function formatCurrencyVariation(
  variation: number,
  iso = 'EUR',
  decimalDigits?: number,
  displaySymbol = true,
  locale = 'fr-FR',
): string {
  switch (iso) {
    case 'FDY':
      return formatFridayCoinsVariation(variation, decimalDigits, displaySymbol, locale);
    case 'ETH':
      return formatEtherVariation(variation, decimalDigits, displaySymbol, locale);
    case 'EUR':
      return formatEurosVariation(variation, decimalDigits, locale);
    default:
      return new Intl.NumberFormat(locale, {
        style: 'currency',
        currency: iso,
        minimumFractionDigits: decimalDigits,
        signDisplay: 'exceptZero',
      }).format(variation);
  }
}
