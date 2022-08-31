export interface SubscriptionsInfo {
  availableSubsList: {name: string; category: string}[];
  currency: string;
  reminder: string;
  categoryList: string[];
  monthBillsSum: number;
  currencyList: string[],
  reminderList: string[],
}

export interface Category {
  name: string;
  limitValue: number;
  color: string;
}
