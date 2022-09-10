import React from 'react';
import classNames from 'classnames/bind';
import { getPercent } from 'utils/getPercent';
import { getCategoryIcon } from 'utils/getCategoruIcon';
import styles from './CategoryItem.module.scss';

const cx = classNames.bind(styles);

export interface CategoryItemProps {
  name: string;
  currentValue: number;
  limitValue: number;
  color: string;
}

const CategoryItem = ({ name, currentValue, limitValue, color }: CategoryItemProps) => {
  const Icon = getCategoryIcon(name);
  const differenceBetweenSum = limitValue - currentValue;
  const percent = getPercent(currentValue, limitValue);
  const styles = { background: color, width: `${percent}%` };
  const fixedValue = currentValue.toFixed(2);

  return (
    <div className={cx('wrapper')}>
     <div className={cx('wrapper_inner')}>
       <Icon />
       <div className={cx('wrapper__content')}>
         <div className={cx('wrapper__content_top')}>
           <span>{name}</span>
           <span>${fixedValue}</span>
         </div>
         <div className={cx('wrapper__content_bottom')}>
           <span>${differenceBetweenSum} left to spend</span>
           <span>of ${limitValue}</span>
         </div>
       </div>
     </div>
     <div className={cx('progress')}>
       <span className={cx('progress__line')} style={styles} />
     </div>
  </div>
  );
};

export default CategoryItem;
