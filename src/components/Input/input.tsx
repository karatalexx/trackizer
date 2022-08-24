import React, { ChangeEvent } from 'react';
import classNames from 'classnames/bind';
import styles from './input.module.scss';

const cx = classNames.bind(styles);

export interface InputProps {
  value: string;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
  label: string;
  isCentered?: boolean;
  className?: string;
}

const Input = ({
  value,
  onChange,
  label,
  isCentered,
  className,
  ...rest
}: InputProps) => (
    <label className={cx('wrapper')}>
      <span
        className={cx('wrapper__label', { center: isCentered })}
        data-testid='label'>
          {label}
      </span>
      <input
        type="text"
        value={value}
        onChange={onChange}
        className={cx('input',`${className}`)}
        {...rest} />
    </label>
);

Input.defaultProps = {
  isCentered: false,
  className: '',
};

export default Input;
