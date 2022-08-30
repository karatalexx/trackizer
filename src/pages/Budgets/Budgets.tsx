import React, { useEffect, useState } from 'react';
import classNames from 'classnames/bind';
import HalfCircleProgressBar from 'components/HalfCircleProgressBar/HalfCircleProgressBar';
import NavMenu from 'components/NavMenu/NavMenu';
import CategoryItem from 'components/CategoryItem/CategoryItem';
import IconButton from 'components/IconButton/IconButton';
import { useNavigate } from 'react-router-dom';
import { useGetDataFromFirestore } from '../../hooks/useGetDataFromFirestore';
import { Tabs } from 'components/TabsMenu/TabsMenu';
import {
  App,
  Category,
  ProgressBarSection,
  SortedByCategory,
  SubscriptionsInfo
} from './type';
import styles from './Budgets.module.scss';
import { ReactComponent as Thumb } from 'assets/icons/thumb.svg';
import { ReactComponent as Settings } from 'assets/icons/settings.svg';
import { ReactComponent as Plus } from 'assets/icons/categoryPlus.svg';

const cx = classNames.bind(styles);

const Budgets = () => {
  const navigate = useNavigate();
  const [subscriptionsInfo, setSubscriptionsInfo] = useState<SubscriptionsInfo>({} as SubscriptionsInfo);
  const [userInfo, loading] = useGetDataFromFirestore();

  const { subsList, limitValue, categoryList } = subscriptionsInfo;

  const appsSortedByCategory = subsList?.reduce((acc: SortedByCategory, app: Tabs) => {
    return {
      ...acc,
      [app.category]: [...acc[app.category] || [], app],
    };
  }, {} as SortedByCategory);

  const progressBarSection = Object.entries(appsSortedByCategory || {})
    .reduce((acc, category: [string, App[]]) => {
      return [
        ...acc,
        {
          color: categoryList?.find(({ name }) => name === category[0])?.color ?? '',
          value: category[1].reduce((acc, item) => acc + +item.price, 0),
        },
      ];
  } ,[] as ProgressBarSection[]);

  useEffect(() => {
    if (userInfo) {
      setSubscriptionsInfo({
        subsList: userInfo[0].subsList,
        limitValue: userInfo[0].categoryList.reduce((acc: number,category: Category) => acc + category.limitValue, 0),
        categoryList: userInfo[0].categoryList,
      });
    }
  }, [userInfo, loading]);

  return (
    <div className={cx('wrapper')}>
      <div className={cx('title')}>
        <span>Spending & Budgets</span>
        <IconButton onClick={() => navigate('/settings')} Icon={Settings} />
      </div>
        <HalfCircleProgressBar limitValue={limitValue ?? 0} data={progressBarSection} />
      <div className={cx('track')}>
        <span>Your budgets are on track</span>
        <Thumb />
      </div>
      <div className={cx('content')}>
        {categoryList?.map(({
          name,
          limitValue,
          color
        }) => {
          const current = subsList.filter(({ category }) => category === name)
            .reduce((acc, item) => acc + +item.price, 0);
          return (
            <div className={cx('content__item')} key={name}>
              <CategoryItem
                name={name}
                currentValue={current}
                limitValue={limitValue}
                color={color}
              />
            </div>
          );
        }
      )}
      </div>
      <button className={cx('content__btn')}>
        Add new category
        <Plus />
      </button>
      <div className={cx('nav')}>
        <NavMenu />
      </div>
    </div>
  );
};

export default Budgets;
