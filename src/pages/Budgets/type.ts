
export interface ProgressBarSection {
  value: number,
  color: string;
}

export interface SortedByCategory {
  [key: string]: App[];
}

export interface App {
  name: string;
  price: string;
  nextPayment: string;
  id: number;
  category: string;
}

export interface Category {
  name: string;
  limitValue: number;
  color: string;
}

export interface SubscriptionsInfo {
  subsList: Tabs[];
  limitValue: number;
  categoryList: Category[];
}

export interface Tabs {
  name: string;
  price: string;
  nextPayment: string;
  id: number;
  category: string;
}
