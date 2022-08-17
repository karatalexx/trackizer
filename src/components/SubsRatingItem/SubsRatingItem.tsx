import React from 'react';
import classNames from 'classnames/bind';
import styles from './SubsRatingItem.module.scss';

const cx = classNames.bind(styles);

export interface SubsRatingItemProps {
  title: string;
  value: string;
  color: string;
}

const SubsRatingItem = ({
  title,
  value,
  color,
}: SubsRatingItemProps) => (
  <div className={cx('container')}>
    <span className={cx('container__divider')} style={{ background: color }}> </span>
    <span className={cx('container__title')}>{title}</span>
    <span className={cx('container__value')}>{value}</span>
  </div>
);

export default SubsRatingItem;
