import React from 'react';
import classNames from 'classnames/bind';
import styles from './Checkbox.module.scss';

const cx = classNames.bind(styles);

export interface CheckboxProps {
  checked: boolean;
  onChange: () => void;
  label?: string;
}

const Checkbox = ({ checked, onChange, label }: CheckboxProps) => {
  return (
    <label className={cx('wrapper')}>
      <input
        type="checkbox"
        className={cx('checkbox-input')}
        checked={checked}
        onChange={onChange}
      />
      <span className={cx('checkbox')} aria-hidden='true'/>
      <span className={cx('wrapper__label')} data-testid='label'>{label}</span>
    </label>
  );
};

Checkbox.defaulrProps = {
  label: '',
}

export default Checkbox;