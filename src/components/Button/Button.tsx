import React, { SVGProps, FC } from 'react';
import classNames from 'classnames/bind';
import styles from './Button.module.scss';

export interface ButtonProps {
  onClick: () => void;
  textContent: string;
  variant?: 'coral' | 'black' | 'blue' | 'white' | 'darkGray' | 'smallGray';
  Icon?: FC<SVGProps<SVGSVGElement>>;
  className?: string;
}

const cx = classNames.bind(styles);

const Button = ({
  onClick,
  textContent,
  variant,
  Icon,
  className,
}: ButtonProps) => (
  <button onClick={onClick} className={cx( 'wrapper',`${variant}`, `${className}`)}>
    {Icon && <Icon data-testid='icon' />}
    <span className={cx( 'wrapper__text', {colorBlack: variant === 'white'})}>{textContent}</span>
  </button>
);

Button.defaultProps = {
  variant: 'coral',
  Icon: null,
  className: '',
};

export default Button;
