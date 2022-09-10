import React from 'react';
import classNames from 'classnames/bind';
import { addZero } from 'utils/addZero';
import styles from './CreditCard.module.scss';
import { ReactComponent as Visa } from 'assets/icons/visa.svg';
import { ReactComponent as ChipCard } from 'assets/icons/chipCard.svg';

const cx = classNames.bind(styles);

export interface CreditCardProps {
  firstName: string;
  lastName: string;
  cardNum: string | number;
  expDate: string;
}

const CreditCard = ({
  firstName,
  lastName,
  cardNum,
  expDate
}: CreditCardProps) => {
  const date = new Date(expDate);
  const month = date.getMonth() + 1;
  const year = date.getFullYear().toString().slice(-2);

  return (
    <div className={cx('container')}>
      <div className={cx('title')}>
        <Visa />
        <span className={cx('title__text')}>Virtual Card</span>
      </div>
      <div className={cx('content')}>
        <span className={cx('content__name')}>{firstName} {lastName}</span>
        <span className={cx('content__num')}>**** **** **** {cardNum}</span>
        <span className={cx('content__date')}>{addZero(month)}/{year}</span>
        <ChipCard />
      </div>
    </div>
  );
};

export default CreditCard;
