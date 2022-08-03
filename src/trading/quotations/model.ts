export interface QuotationDataPoint {
  t: number; // Time (Seconds)
  o: number; // Opening (FDY)
  c: number; // Closing (FDY)
  h: number; // Highest (FDY)
  l: number; // Lowest (FDY)
  a: number; // Average (FDY)
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

export default interface Quotation {
  value: number;
  day_variation?: number;
  last_variation?: number;
  history?: QuotationHistory;
}
