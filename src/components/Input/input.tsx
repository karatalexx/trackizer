import React, { ChangeEvent } from 'react';
import classNames from 'classnames/bind';
import styles from './input.module.scss';

const cx = classNames.bind(styles);

export interface InputProps {
  value: string;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
  label: string;
  className?: string;
}

const Input = ({
  value,
  onChange,
  label,
  className,
  ...rest
}: InputProps) => (
    <label className={cx('wrapper')}>
      <span className={cx('wrapper__label')}>{label}</span>
      <input type="text" value={value} onChange={onChange} {...rest} className={cx('input',`${className}`)} />
    </label>
);

Input.defaultProps = {
  className: '',
};

export default Input;
