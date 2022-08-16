import React from 'react';
import classNames from 'classnames/bind';
import styles from './CircularProgressBar.module.scss';
import Logo from '../Logo/Logo';
import Button from '../Button/Button';

const cx = classNames.bind(styles);

export interface CircularProgressBarProps {
  currentValue: number;
  limitValue: number;
  buttonText: string;
  onClick: () => void;
}

const CircularProgressBar = ({
  currentValue,
  limitValue,
  buttonText,
  onClick,
}: CircularProgressBarProps) => {
    const numberWithCommas = (value: number): string => {
        return value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
    }

    const percent = (currentValue * 100) / limitValue;
    const strokeDashoffsetValue = percent < 100 ? 241 * (1-percent/100) : 0;

    return (
        <div className={cx('wrapper')}>
            <svg viewBox="0 0 100 100" overflow="visible">
                <radialGradient id="gradient" x1="0" y1="0" x2="0" y2="100%">
                    <stop offset="0%" stopColor="#FFFFFF"/>
                    <stop offset="50%" stopColor="#FFD2CC"/>
                    <stop offset="100%" stopColor="#FF7966"/>
                </radialGradient>
                <path className={cx('grey')} d="M19,90 A48,48 0 1,1 80,90" fill='none'/>
                <filter id="shadow">
                    <feDropShadow
                      dx="0"
                      dy="0"
                      stdDeviation="4"
                      floodColor="rgba(255, 121, 102, 0.5)"
                    />
                </filter>
                <path
                  filter="url(#shadow)"
                  id="orange"
                  fill='none'
                  className={cx('orange')}
                  d="M19,90 A48,48 0 1,1 80,90"
                  strokeDasharray={241}
                  strokeDashoffset={strokeDashoffsetValue}
                />
            </svg>
            <div className={cx('inner')}>
              <Logo />
              <span className={cx('inner__sum')}>${numberWithCommas(currentValue)}</span>
              <Button
                className={cx('inner__btn')}
                onClick={onClick}
                textContent={buttonText}
                variant="smallGray"
              />
            </div>
        </div>
    );
};

export default CircularProgressBar;
