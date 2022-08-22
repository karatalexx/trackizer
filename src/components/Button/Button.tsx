import React, { SVGProps, FC, MouseEvent, ReactElement } from 'react';
import classNames from 'classnames/bind';
import styles from './Button.module.scss';

export interface ButtonProps {
  onClick: (e?: MouseEvent<HTMLButtonElement>) => void;
  children: ReactElement;
  variant?: 'coral' | 'black' | 'blue' | 'white' | 'darkGray' | 'smallGray';
  Icon?: FC<SVGProps<SVGSVGElement>>;
  className?: string;
}

const cx = classNames.bind(styles);

const Button = ({
  onClick,
  children,
  variant,
  Icon,
  className,
  ...rest
}: ButtonProps) => (
  <button
    onClick={onClick}
    className={cx( 'wrapper',`${variant}`, `${className}`)}
    {...rest}
  >
    {Icon && <Icon data-testid='icon' />}
    <span className={cx( 'wrapper__text', {colorBlack: variant === 'white'})}>{children}</span>
  </button>
);

Button.defaultProps = {
  variant: 'coral',
  Icon: null,
  className: '',
};

export default Button;
