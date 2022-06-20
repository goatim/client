import { Model } from '../../../api';

interface AggregatedOrders {
  nb_orders?: number;
  total_quantity?: number;
  price_limit?: number;
}

export default interface OrderBook extends Model {
  selling?: AggregatedOrders[];
  buying?: AggregatedOrders[];
}
