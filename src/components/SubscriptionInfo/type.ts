export interface SubscriptionInfoProps {
  name: string;
  price: number | string;
  description: string;
  category: {
    current: string;
    categoryList: string[];
  };
  firstPayment: string;
  reminder: {
    current: string;
    reminderList: string[];
  };
  currency: {
    current: string;
    currencyList: string[];
  };
  onSubmit: (data: unknown) => void;
  onDelete: () => void;
  onDownArrowClick: () => void;
}
