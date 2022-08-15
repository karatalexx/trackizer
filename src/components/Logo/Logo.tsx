import React from 'react';
import classNames from 'classnames/bind';
import { ReactComponent as LogoIcon } from '../../assets/icons/logo.svg';
import styles from './Logo.module.scss';

const cx = classNames.bind(styles);

export interface LogoProps {
  size?: 'small' | 'medium' | 'big';
}

const Logo = ({ size }: LogoProps) => {
    return (
        <div className={cx(`${size}`)} data-testid={size}>
          <LogoIcon />
        </div>
    );
};

Logo.defaultProps = {
  size: 'medium',
}

export default Logo;
