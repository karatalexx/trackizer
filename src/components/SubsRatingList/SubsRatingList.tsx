import React from 'react';
import classNames from 'classnames/bind';
import SubsButton from '../SubsRatingItem/SubsRatingItem';
import styles from './SubsRatingList.module.scss';

const cx = classNames.bind(styles)

export interface SubsRatingListProps {
  list: Tab[];
}

interface Tab {
  name: string;
  price: string | number;
  nextPayment: string;
  id: string | number;
}

const SubsRatingList = ({ list }: SubsRatingListProps) => {
  const highestPrice = list.length ? Math.max(...list.map(({ price }) => +price)) : 0;
  const lowestPrice = list.length ? Math.min(...list.map(({ price }) => +price)) : 0;

  return (
    <div className={cx('wrapper')} data-testid='wrapper'>
      <div className={cx('button')}>
        <SubsButton
          color='#FFA699'
          title='Active subs'
          value={list.length}
        />
      </div>
      <div className={cx('button')}>
        <SubsButton
          color='#AD7BFF'
          title='Highest subs'
          value={`$${highestPrice}`}
        />
      </div>
      <div className={cx('button')}>
        <SubsButton
          color='#7DFFEE'
          title='Lowest subs'
          value={`$${lowestPrice}`}
        />
      </div>
    </div>
  )
};

export default SubsRatingList;
