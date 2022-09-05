import React, { useState } from 'react';
import classNames from 'classnames/bind';
import CreditCard from '../CreditCard/CreditCard';
import { useSwipeable } from 'react-swipeable';
import styles from './CreditCardList.module.scss';

const cx = classNames.bind(styles);

export interface CreditCardListProps {
  list?: {
    firstName: string;
    lastName: string;
    cardNum: string | number;
    expDate: string;
    id: string | number;
  }[];
}

const CreditCardList = ({ list }: CreditCardListProps) => {
  const [activeIndex, setActiveIndex] = useState(0);

  const updateIndex = (newIndex: number) => {
    if (list && newIndex >= 0 && newIndex <= list.length - 1) setActiveIndex(newIndex);
  };

  const handlers = useSwipeable({
    trackMouse: true,
    onSwipedLeft: () =>  updateIndex(activeIndex + 1),
    onSwipedRight: () => updateIndex(activeIndex - 1)
  });

  return (
    <div {...handlers}  className={cx('carousel')} data-testid='slider'>
      <div
        className={cx('inner')}
        style={{ transform: `translateX(-${list && activeIndex * (100/list.length)}%)` }}>
          {list?.map(({
            firstName,
            lastName,
            cardNum,
            expDate,
            id,
          }) => (
            <div className={cx('inner__card')} key={id}>
              <CreditCard
                firstName={firstName}
                lastName={lastName}
                cardNum={cardNum}
                expDate={expDate}
              />
            </div>
          ))}
      </div>
    </div>
  );
};

CreditCardList.defaultProps = {
  list: [{
    firstName: 'NO',
    lastName: 'CARDS',
    cardNum: 1111,
    expDate: new Date().toLocaleDateString(),
    id: 1,
  }],
}

export default CreditCardList;
