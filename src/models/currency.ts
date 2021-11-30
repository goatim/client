import { Model } from '@cezembre/fronts';

export default interface Currency extends Model {
  name?: string;
  iso?: string;
  symbol?: string;
  smallest_unit_factor?: number;
}

export function formatCurrencyAmount(amount = 0, currency = 'EUR', locale = 'fr-FR'): string {
  return new Intl.NumberFormat(locale, { style: 'currency', currency }).format(amount / 100);
}
