import { formatFridayCoinsAmount, formatFridayCoinsGains } from './fridayCoins';
import { formatEtherAmount, formatEtherGains } from './ether';
import { formatEurosAmount, formatEurosGains } from './euros';

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

export function formatCurrencyGains(
  gains: number,
  iso = 'EUR',
  decimalDigits?: number,
  displaySymbol = true,
  locale = 'fr-FR',
): string {
  switch (iso) {
    case 'FDY':
      return formatFridayCoinsGains(gains, decimalDigits, displaySymbol, locale);
    case 'ETH':
      return formatEtherGains(gains, decimalDigits, displaySymbol, locale);
    case 'EUR':
      return formatEurosGains(gains, decimalDigits, locale);
    default:
      return new Intl.NumberFormat(locale, {
        style: 'currency',
        currency: iso,
        minimumFractionDigits: decimalDigits,
        signDisplay: 'exceptZero',
      }).format(gains);
  }
}
