import React, { useState, MouseEvent } from 'react';
import classNames from 'classnames/bind';
import Button from '../Button/Button';
import SubscriptionsItem from '../SubscriptionsItem/SubscriptionsItem';
import { getSubscriptionIcon } from '../../utils/getSubscriptionIcon';
import styles from './TabsMenu.module.scss';

const cx = classNames.bind(styles);

// that part will be removed after the database is ready
const mockedList = [
  {
    name: 'Spotify',
    price:'$5.99',
    date: '2022-10-05T14:48:00.000',
  },
  {
    name: 'YouTube Premium',
    price: '$18.99',
    date: '2022-09-07T14:48:00.000',
  },
  {
    name: 'Microsoft OneDrive',
    price: '$29.99',
    date: '2022-11-12T14:48:00.000',
  },
];

export interface TabsMenuProps {
  list?: {
      name: string;
      price: string;
      date: string;
  }[];
}

const TabsMenu = ({ list }: TabsMenuProps) => {
  const [selected, setSelected] = useState<string>('Your subscriptions');

  const selectHandler = (e?: MouseEvent<HTMLButtonElement>) => {
    e?.currentTarget.textContent && setSelected(e.currentTarget.textContent);
  };

  return (
    <div className={cx('wrapper')}>
      <div className={cx('tabs__btns')}>
        <Button
          onClick={selectHandler}
          textContent='Your subscriptions'
          variant='smallGray'
          className={selected === 'Your subscriptions' ? 'active' : 'inactive'}
        />
        <Button
          onClick={selectHandler}
          textContent='Upcoming bills'
          variant='smallGray'
          className={selected === 'Upcoming bills' ? 'active' : 'inactive'}
          data-testid="upcoming"
        />
      </div>
        <div className={cx('container')}>
          {list && list.map(({ name, price, date }) => (
            <SubscriptionsItem
              Icon={getSubscriptionIcon(name)}
              name={name}
              price={price}
              date={date}
              isUpcomingBill={selected === 'Upcoming bills'}
              key={name+price}
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
