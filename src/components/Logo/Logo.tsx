import React from 'react';
import classNames from 'classnames/bind';
import styles from './Logo.module.scss';
import { ReactComponent as LogoIcon } from 'assets/icons/logo.svg';

const cx = classNames.bind(styles);

export interface LogoProps {
  onClick: () => void;
  size?: 'small' | 'medium' | 'big';
}

const Logo = ({ size, onClick }: LogoProps) => (
  <div
    onClick={onClick}
    className={cx(`${size}`)}
    data-testid={size}>
    <LogoIcon />
  </div>
);

Logo.defaultProps = {
  size: 'medium',
  onClick: null,
}

export default Logo;
