import React, { FC, SVGProps } from 'react';
import classNames from 'classnames/bind';
import styles from './SubscriptionsItem.module.scss';

const cx = classNames.bind(styles);

export interface SubscriptionsItemProps {
  name: string;
  price: string;
  date: string;
  Icon: FC<SVGProps<SVGSVGElement>>;
  isUpcomingBill?: boolean;
  isSquare?: boolean;
}

const SubscriptionsItem = ({
  name,
  price,
  Icon,
  date,
  isUpcomingBill,
  isSquare
}: SubscriptionsItemProps) => {
  const options: Intl.DateTimeFormatOptions = { month: 'short', day: '2-digit' };
  const [month, day] = new Date(date).toLocaleDateString('en-US', options).split(' ');

  return (
    <div className={cx('wrapper', {square: isSquare})}>
      <div className={cx('wrapper__left')}>
        {isUpcomingBill ? (
            <div className={cx('date')}>
              <span className={cx('date__month')} data-testid={month}>{month}</span>
              <span className={cx('date__day')} data-testid={day}>{day}</span>
            </div>
        ) : <Icon data-testid={name} />}
        <span className={cx('name')}>{name}</span>
      </div>
      <span className={cx('price')}>{price}</span>
    </div>
  );
};

export default SubscriptionsItem;
