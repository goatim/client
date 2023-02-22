import { Model } from '../../api';
import { Currency } from '../currencies';

/**
 * Currencies rate
 * FDY/ETH
 * FDY: Base
 * ETH: Target
 * e.g. 1 FDY = 0.00059 EUR (rate = 0.00059);
 */

export interface CurrenciesRate extends Model<'currencies_rate'> {
  base_currency?: Currency | string;
  target_currency?: Currency | string;
  rate?: number;
}
