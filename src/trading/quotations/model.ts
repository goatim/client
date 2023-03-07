export interface QuotationDataPoint {
  t: number; // Time (Seconds)
  o: number; // Opening (GTC)
  c: number; // Closing (GTC)
  h: number; // Highest (GTC)
  l: number; // Lowest (GTC)
  a: number; // Average (GTC)
  v: number; // Volume (Shares)
}

export interface QuotationHistory {
  data: QuotationDataPoint[];
  variation: number;
  from?: string;
  to?: string;
  interval?: number;
  resolved_interval?: string;
}

export interface Quotation {
  value: number;
  day_variation?: number;
  last_variation?: number;
  history?: QuotationHistory;
}
