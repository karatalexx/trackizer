import React, { useEffect, useState } from 'react';
import classNames from 'classnames/bind';
import CircularProgressBar from 'components/CircularProgressBar/CircularProgressBar';
import SubsRatingList from 'components/SubsRatingList/SubsRatingList';
import TabsMenu, { Tabs } from 'components/TabsMenu/TabsMenu';
import NavMenu from 'components/NavMenu/NavMenu';
import IconButton from 'components/IconButton/IconButton';
import Loader from 'components/Loader/Loader';
import { useNavigate } from 'react-router-dom';
import { useGetDataFromFirestore } from 'hooks/useGetDataFromFirestore';
import {Category, SubscriptionsInfo} from './type';
import styles from './Home.module.scss';
import { ReactComponent as Settings } from 'assets/icons/settings.svg';

const cx = classNames.bind(styles);

const Home = () => {
  const navigate = useNavigate();
  const [subscriptionsInfo, setSubscriptionsInfo] = useState<SubscriptionsInfo>({} as SubscriptionsInfo);
  const [userInfo, loading] = useGetDataFromFirestore();
  const { subsList, limitValue, currentValue } = subscriptionsInfo;

  useEffect(() => {
    if (userInfo) {
      setSubscriptionsInfo({
        subsList: userInfo[0].subsList,
        limitValue: userInfo[0].categoryList.reduce((acc: number,category: Category) => acc + category.limitValue, 0),
        currentValue: userInfo[0].subsList.reduce((acc: number, item: Tabs) => acc + +item.price, 0),
      });
    }
  }, [userInfo, loading]);

  return (
    <div className={cx('wrapper')}>
      {loading && <Loader />}
       <div className={cx('progress')}>
         <div className={cx('progress__btn')}>
           <IconButton onClick={() => navigate('/settings')} Icon={Settings} />
         </div>
         <CircularProgressBar
           currentValue={currentValue || 0}
           limitValue={limitValue || 0}
           buttonText='See your budget'
           onClick={() => navigate('/budgets')}
         />
         <div className={cx('rating')}>
           <SubsRatingList list={subsList || []} />
         </div>
       </div>
       <div className={cx('tabs')}>
         <TabsMenu list={subsList || []} />
         <div className={cx('tabs__nav')}>
           <NavMenu />
         </div>
       </div>
    </div>
  );
};

export default Home;