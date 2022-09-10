import React, {FC, SVGProps} from 'react';
import Input from '../Input/input';
import classNames from 'classnames/bind';
import styles from './Field.module.scss';
import { ReactComponent as RightArrow } from 'assets/icons/btnRightArrow.svg';

const cx = classNames.bind(styles);

export interface FieldProps {
  value: string;
  name: string;
  type: 'select' | 'checkbox' | 'text' | 'date';
  isClicked: boolean;
  onChange: () => void;
  isChecked?: boolean;
  onClick?: (value: string) => void;
  selectList?: string[];
  onBlur?: () => void;
  Icon?: FC<SVGProps<SVGSVGElement>>;
}

const Field = ({
  value,
  name,
  type,
  isClicked,
  onClick,
  onChange,
  onBlur,
  selectList,
  Icon,
}: FieldProps) => (
  <div className={cx('content')}>
    <div className={cx('content__title')}>
      {Icon && <Icon />}
      <span className={cx('content__name')}>{name}</span>
    </div>
    {type === 'checkbox' ? (
      <Input
        className='settings'
        onChange={onChange}
        onBlur={onBlur}
        value={value}
        type={type}
        data-testid={value}
      />
      ) :
      isClicked ?
        (type === 'select' ? (
          <select onBlur={onBlur} onChange={onChange} data-testid={value}>
            {selectList?.length && selectList.map((item) => (
              <option value={item} key={item}>{item}</option>
            ))}
          </select>
        ) : (
          <Input
            className='settings'
            onChange={onChange}
            value={value}
            onBlur={onBlur}
            type={type}
            data-testid={value}
          />
        )) : (
          <button
            onClick={() => onClick && onClick(name)}
            className={cx('btn')}
            data-testid={value}>
              {value}
            <RightArrow/>
          </button>
        )}
  </div>
);

Field.defaultProps = {
  selectList: [],
  Icon: null,
};

export default Field;
