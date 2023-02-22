interface AggregatedOrders {
  nb_orders?: number;
  total_shares?: number;
  price_limit?: number;
}

export interface OrderBook {
  buying?: AggregatedOrders[];
  selling?: AggregatedOrders[];
}
