import React, { ChangeEvent } from 'react';
import classNames from 'classnames/bind';
import styles from './input.module.scss';

const cx = classNames.bind(styles);

export interface InputProps {
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
  value?: string | number;
  onBlur?: () => void;
  label?: string;
  isCentered?: boolean;
  className?: string;
  type?: string;
}

const Input = ({
  value,
  onChange,
  onBlur,
  label,
  isCentered,
  className,
  type,
}: InputProps) => (
  <label className={cx('wrapper', { toggleSwitch: type === 'checkbox' })}>
    <span
      className={cx('wrapper__label', { center: isCentered })}
      data-testid='label'>
        {label}
    </span>
    <input
      type={type}
      value={value}
      onBlur={onBlur}
      onChange={onChange}
      className={cx('input',`${className}`)}
    />
    {type === 'checkbox' && <span className={cx('switch')} />}
  </label>
);

Input.defaultProps = {
  isCentered: false,
  className: '',
  type: 'text',
  label: '',
};

export default Input;
