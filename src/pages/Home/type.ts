export interface Category {
  name: string;
  limitValue: number;
  color: string;
}

export interface SubscriptionsInfo {
  subsList: Tabs[];
  limitValue: number;
  currentValue: number;
}

export interface Tabs {
  name: string;
  price: string;
  nextPayment: string;
  id: number;
  category: string;
}
