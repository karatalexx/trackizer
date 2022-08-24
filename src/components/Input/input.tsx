import React, { ChangeEvent } from 'react';
import classNames from 'classnames/bind';
import styles from './input.module.scss';

const cx = classNames.bind(styles);

export interface InputProps {
  value: string | number;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
  label: string;
  isCentered?: boolean;
  className?: string;
  type?: string;
}

const Input = ({
  value,
  onChange,
  label,
  isCentered,
  className,
  type,
  ...rest
}: InputProps) => (
    <label className={cx('wrapper')}>
      <span
        className={cx('wrapper__label', { center: isCentered })}
        data-testid='label'>
          {label}
      </span>
      <input
        type={type}
        value={value}
        onChange={onChange}
        className={cx('input',`${className}`)}
        {...rest} />
    </label>
);

Input.defaultProps = {
  isCentered: false,
  className: '',
  type: 'text',
};

export default Input;
