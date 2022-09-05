import React, { useEffect, useState } from 'react';
import classNames from 'classnames/bind';
import IconButton from 'components/IconButton/IconButton';
import CreditCardList from 'components/CreditCardList/CreditCardList';
import NavMenu from 'components/NavMenu/NavMenu';
import { useNavigate } from 'react-router-dom';
import { useGetDataFromFirestore } from 'hooks/useGetDataFromFirestore';
import { getSubscriptionIcon } from 'utils/getSubscriptionIcon';
import { SubscriptionsInfo } from './type';
import styles from './CreditCards.module.scss';
import { ReactComponent as Settings } from 'assets/icons/settings.svg';
import { ReactComponent as Plus } from 'assets/icons/categoryPlus.svg';

const cx = classNames.bind(styles);

const CreditCards = () => {
  const navigate = useNavigate();
  const [userInfo, loading] = useGetDataFromFirestore();
  const [subscriptionsInfo, setSubscriptionsInfo] = useState<SubscriptionsInfo>({} as SubscriptionsInfo);
  const { subsList, } = subscriptionsInfo;

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

  return (
    <div className={cx('wrapper')}>
      <div className={cx('title')}>
        <span>Credit Cards</span>
        <IconButton onClick={() => navigate('/settings')} Icon={Settings} />
      </div>
      <div>
        <CreditCardList />
      </div>
      <span className={cx('subs_title')}>Subscriptions</span>
      <div className={cx('subscriptions')}>
        {subsList?.map(({ name }) => {
          const Icon = getSubscriptionIcon(name);
          return(
            <div key={name}>
              <Icon />
            </div>
          );
        })}
      </div>
      <div className={cx('footer')}>
        <button className={cx('footer__btn')}>
          <span>
            Add new card
          </span>
          <Plus />
        </button>
        <div className={cx('nav')}>
          <NavMenu />
        </div>
      </div>
    </div>
  );
};

export default CreditCards;
