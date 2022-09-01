import React, { useEffect, useMemo, useState } from 'react';
import classNames from 'classnames/bind';
import Calendar from 'components/Calendar/Calendar';
import IconButton from 'components/IconButton/IconButton';
import NavMenu from 'components/NavMenu/NavMenu';
import SubscriptionsItem from 'components/SubscriptionsItem/SubscriptionsItem';
import { useNavigate } from 'react-router-dom';
import { useGetDataFromFirestore } from 'hooks/useGetDataFromFirestore';
import { getSubscriptionIcon } from 'utils/getSubscriptionIcon';
import {SelectedDate, SubscriptionsInfo, SubsList} from './type';
import styles from './CalendarPage.module.scss';
import { ReactComponent as Settings } from 'assets/icons/settings.svg';

const cx = classNames.bind(styles);

const CalendarPage = () => {
  const navigate = useNavigate();
  const [subscriptionsInfo, setSubscriptionsInfo] = useState<SubscriptionsInfo>({} as SubscriptionsInfo);
  const [filteredSubs, setFilteredSubs] = useState<SubsList[]>([]);
  const [selectedDate, setSelectedDate] = useState<SelectedDate>({
    date: new Date(new Date().setHours(0, 0, 0, 0)).toLocaleDateString(),
    month: new Date().toLocaleString('default',{month:'long'}),
  });
  const { subsList, } = subscriptionsInfo;
  const { month, date } = selectedDate;
  const [userInfo, loading] = useGetDataFromFirestore();
  const upComingBillsSum = useMemo(() => {
    return filteredSubs?.reduce((acc,{ price }) => acc + price ,0);
  }, [filteredSubs]);

  const calendarHandler = (date: string) => {
    const filteredList = subsList?.filter((item) => {
      if (item.nextPayment === date) {
        return item;
      }
    });
    setFilteredSubs(filteredList)
  };

  const selectedMothHandler = (value: string) => {
    setSelectedDate({
      date: '',
      month: value,
    });
  };

  const selectedDateHandler = (value: string) => {
    setSelectedDate((prevState) => ({
      ...prevState,
      date: value,
    }));
  };

  useEffect(() => {
    if (userInfo) {
      setSubscriptionsInfo((prevState) => {
        return ({
          ...prevState,
          subsList: userInfo[0].subsList,
        })
      });
    }
  }, [userInfo, loading]);

  useEffect(() => {
    calendarHandler(new Date(new Date().setHours(0, 0, 0, 0)).toLocaleDateString());
  },[subsList]);

  return (
    <div className={cx('wrapper')}>
      <div className={cx('title')}>
        <span>Spending & Budgets</span>
        <IconButton onClick={() => navigate('/settings')} Icon={Settings} />
      </div>
      <div className={cx('calendar')}>
        <Calendar
          onClick={calendarHandler}
          selectedMothHandler={selectedMothHandler}
          selectedDateHandler={selectedDateHandler}
          subsCount={filteredSubs?.length}
        />
      </div>
      <div className={cx('additional__info')}>
        <div className={cx('additional__info_top')}>
          <span>{month}</span>
          <span>${upComingBillsSum}</span>
        </div>
        <div className={cx('additional__info_bottom')}>
          <span>{date}</span>
          <span>in upcoming bills</span>
        </div>
      </div>
      <div className={cx('subscriptions')}>
        {filteredSubs?.map(({ name, price, firstPayment }) => (
          <SubscriptionsItem
            name={name}
            price={`${price}`}
            Icon={getSubscriptionIcon(name)}
            date={firstPayment}
            isSquare
            key={name}
          />
        ))}
      </div>
      <div className={cx('nav')}>
        <NavMenu />
      </div>
    </div>
  );
};

export default CalendarPage;
