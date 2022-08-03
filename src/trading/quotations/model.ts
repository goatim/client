export interface QuotationDataPoint {
  t: string; // Time
  o: number; // Opening
  c: number; // Closing
  h: number; // Highest
  l: number; // Lowest
  a: number; // Average
  v: number; // Volume
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
