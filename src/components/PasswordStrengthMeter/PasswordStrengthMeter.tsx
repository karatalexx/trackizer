import React from 'react';
import classNames from 'classnames/bind';
import zxcvbn from 'zxcvbn';
import styles from './PasswordStrengthMeter.module.scss';

const cx = classNames.bind(styles);

export interface PasswordStrengthMeterProps {
  password: string;
}

const PasswordStrengthMeter = ({password}: PasswordStrengthMeterProps) => {
  const passwordScore = zxcvbn(password).score;

  return (
    <div className={cx('strength-meter')}>
      <div className={cx('strength-meter-fill')} data-strength={passwordScore}></div>
    </div>
  );
};

export default PasswordStrengthMeter;
