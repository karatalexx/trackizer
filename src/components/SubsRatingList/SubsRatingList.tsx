import React from 'react';
import classNames from 'classnames/bind';
import SubsButton from '../SubsRatingItem/SubsRatingItem';
import styles from './SubsRatingList.module.scss';

const cx = classNames.bind(styles)

export interface SubsRatingListProps {
  list: {
    color: string;
    title: string;
    value: string;
  }[];
}

const SubsRatingList = ({ list }: SubsRatingListProps) => (
  <div className={cx('wrapper')}>
    {list.map(({ color, title, value }) => (
      <div className={cx('button')}  key={title+value}>
        <SubsButton
          color={color}
          title={title}
          value={value}
        />
      </div>
    ))}
  </div>
);

export default SubsRatingList;
