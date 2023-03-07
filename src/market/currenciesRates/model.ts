import { Model } from '../../api';
import { Currency } from '../currencies';

/**
 * Currencies rate
 * GTC/ETH
 * GTC: Base
 * ETH: Target
 * e.g. 1 GTC = 0.00059 EUR (rate = 0.00059);
 */

export interface CurrenciesRate extends Model<'currencies_rate'> {
  base_currency?: Currency | string;
  target_currency?: Currency | string;
  rate?: number;
}
