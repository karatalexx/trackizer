export interface SubscriptionsInfo {
  subsList: SubsList[];
}

export interface SubsList {
  category: string;
  currency: string;
  description: string;
  firstPayment: string;
  monthBillsSum: number;
  name: string;
  nextPayment: string;
  price: number;
  reminder: string;
}
