interface AggregatedOrders {
  nb_orders?: number;
  total_shares?: number;
  price_limit?: number;
}

export default interface OrderBook {
  buying?: AggregatedOrders[];
  selling?: AggregatedOrders[];
}
