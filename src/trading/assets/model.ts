import { Model } from '../../api';
import { Player, Club, League } from '../../soccer';
import { QuotationHistory } from '../quotations';

export type AssetType = 'player' | 'club' | 'league';

export interface Asset extends Model<'asset'> {
  entity?: string;
  type?: AssetType;
  name?: string;
  description?: string;
  slug?: string;
  total_shares?: number;
  last_dividend?: number;
  quotation?: number;
  midnight_quotation?: number;
  day_variation?: number;
  player?: Player | string;
  club?: Club | string;
  league?: League | string;
  quotation_history?: QuotationHistory;
  average_dividends_percentage?: number;
  average_dividends_amount?: number;
  total_dividends?: number;
  total_dividends_distributed?: number;
}
