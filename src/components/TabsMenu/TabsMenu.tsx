import React, { useState } from 'react';
import classNames from 'classnames/bind';
import Button from '../Button/Button';
import SubscriptionsItem from '../SubscriptionsItem/SubscriptionsItem';
import { getSubscriptionIcon } from 'utils/getSubscriptionIcon';
import styles from './TabsMenu.module.scss';

const cx = classNames.bind(styles);

// that part will be removed after the database is ready
const mockedList = [
  {
    name: 'Spotify',
    price:'$5.99',
    date: '2022-10-05T14:48:00.000',
    id: 1,
  },
  {
    name: 'YouTube Premium',
    price: '$18.99',
    date: '2022-09-07T14:48:00.000',
    id: 2,
  },
  {
    name: 'Microsoft OneDrive',
    price: '$29.99',
    date: '2022-11-12T14:48:00.000',
    id: 3,
  },
];

export interface TabsMenuProps {
  list?: {
    name: string;
    price: string;
    date: string;
    id: string | number;
  }[];
}

const TabsMenu = ({ list }: TabsMenuProps) => {
  const buttonList = ['Your subscriptions', 'Upcoming bills'];
  const buttonsMap = new Map(buttonList.map((button, index) => [index, button]));
  const [selected, setSelected] = useState(0);

  const selectHandler = (index: number) => {
    setSelected(index);
  };

  return (
    <div className={cx('wrapper')}>
      <div className={cx('tabs__btns')}>
        {buttonList.map((button, index) => (
          <Button
            onClick={() => selectHandler(index)}
            variant='smallGray'
            className={selected === index ? 'active' : 'inactive'}
            key={index}>
              <span>{buttonsMap.get(index)}</span>
          </Button>
        ))}
      </div>
        <div className={cx('container')}>
          {list && list.map(({ name, price, date, id }) => (
            <SubscriptionsItem
              Icon={getSubscriptionIcon(name)}
              name={name}
              price={price}
              date={date}
              isUpcomingBill={selected === 1}
              key={id}
              data-testid={name}
            />)
          )}
        </div>
    </div>
  );
};
// that part will be removed after the database is ready
TabsMenu.defaultProps = {
  list: mockedList,
}

export default TabsMenu;
