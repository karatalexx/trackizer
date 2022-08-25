import React from 'react';
import Input from '../Input/input';
import classNames from 'classnames/bind';
import { ReactComponent as RightArrow } from 'assets/icons/btnRightArrow.svg';
import styles from './Field.module.scss';

const cx = classNames.bind(styles);

export interface FieldProps {
  value: string;
  name: string;
  type: string;
  isClicked: boolean;
  onClick: (value: string) => void;
  onChange: () => void;
  selectList?: string[];
}

const Field = ({
  value,
  name,
  type,
  isClicked,
  onClick,
  onChange,
  selectList
}: FieldProps) => {
  return (
    <div className={cx('content')}>
      <span className={cx('name')}>{name}</span>
      {isClicked ?
        (type === 'select' ? (
          <select onChange={onChange} data-testid={value}>
            {selectList?.length && selectList.map((item) => (
              <option value={item} key={item}>{item}</option>
            ))}
          </select>
        ) : (
          <Input
            className='settings'
            onChange={onChange}
            value={value}
            type={type}
            data-testid={value}
          />
        )) : (
          <button
            onClick={() => onClick(name)}
            className={cx('btn')}
            data-testid={value}>
              {value}
            <RightArrow/>
          </button>
        )}
    </div>
  );
};

export default Field;
