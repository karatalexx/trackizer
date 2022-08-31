import React, { useState } from 'react';
import classNames from 'classnames/bind';
import Button from '../Button/Button';
import SubscriptionsItem from '../SubscriptionsItem/SubscriptionsItem';
import { getSubscriptionIcon } from 'utils/getSubscriptionIcon';
import styles from './TabsMenu.module.scss';

const cx = classNames.bind(styles);

export interface TabsMenuProps {
  list?: Tabs[];
}

export interface Tabs {
  name: string;
  price: string;
  nextPayment: string;
  id: number;
  category: string;
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
          {list && list.map(({ name, price, nextPayment, id }) => (
            <SubscriptionsItem
              Icon={getSubscriptionIcon(name)}
              name={name}
              price={price}
              date={nextPayment}
              isUpcomingBill={selected === 1}
              key={id}
              data-testid={name}
            />)
          )}
        </div>
    </div>
  );
};

TabsMenu.defaultProps = {
  list: [],
}

export default TabsMenu;
