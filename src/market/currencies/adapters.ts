import { formatFridayCoinsAmount, formatFridayCoinsVariation } from './fridayCoins';
import { formatEtherAmount, formatEtherVariation } from './ether';
import { formatEurosAmount, formatEurosVariation } from './euros';

export function formatCurrencyAmount(
  amount: number,
  iso = 'EUR',
  decimalDigits?: number,
  locale = 'fr-FR',
): string {
  switch (iso) {
    case 'FDY':
      return formatFridayCoinsAmount(amount, decimalDigits, locale);
    case 'ETH':
      return formatEtherAmount(amount, decimalDigits, locale);
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
  locale = 'fr-FR',
): string {
  switch (iso) {
    case 'FDY':
      return formatFridayCoinsVariation(variation, decimalDigits, locale);
    case 'ETH':
      return formatEtherVariation(variation, decimalDigits, locale);
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
