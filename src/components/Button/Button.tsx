import React, { SVGProps, FC, MouseEvent, ReactElement } from 'react';
import classNames from 'classnames/bind';
import styles from './Button.module.scss';

export interface ButtonProps {
  children: ReactElement;
  onClick?: (e?: MouseEvent<HTMLButtonElement>) => void;
  variant?: 'coral' | 'black' | 'blue' | 'white' | 'darkGray' | 'smallGray';
  Icon?: FC<SVGProps<SVGSVGElement>>;
  className?: string;
  type?: 'button' | 'submit' | 'reset';
}

const cx = classNames.bind(styles);

const Button = ({
  onClick,
  children,
  variant,
  Icon,
  className,
  type,
}: ButtonProps) => (
  <button
    onClick={onClick}
    className={cx( 'wrapper',`${variant}`, `${className}`)}
    type={type}
  >
    <span className={cx( 'wrapper__content')}>
      {Icon && <Icon data-testid='icon' />}
      <span className={cx( 'wrapper__text', {colorBlack: variant === 'white'})}>{children}</span>
    </span>
  </button>
);

Button.defaultProps = {
  variant: 'coral',
  Icon: null,
  className: '',
  type: 'button',
};

export default Button;
