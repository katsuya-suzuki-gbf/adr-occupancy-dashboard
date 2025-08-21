export interface DataPoint {
  date: string;
  adr: number;
  occupancy: number;
}

export interface RoomTypePerformance {
  roomType: string;
  occupancy: number;
  adr: number;
  totalRevenue: number;
}

export interface RevenueBreakdown {
  month: string;
  guests: number;
  accommodation: number;
  foodAndBeverage: number;
  souvenir: number;
  spaAndWellness: number;
  other: number;
}

export interface CashFlowDataPoint {
  date: string;
  income: number;
  expenses: number;
  balance: number;
}

export interface LeadTimeBin {
  name: string;
  count: number;
}

export interface RevenueShare {
  name: string; // チャネル名 or プラン名
  value: number; // 売上金額
}