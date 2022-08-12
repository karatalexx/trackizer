import React, { SVGProps, FC } from 'react';
import classNames from 'classnames/bind';
import styles from './Button.module.scss';

export interface ButtonProps {
  onClick: () => void;
  textContent: string;
  variant?: 'coral' | 'black' | 'blue' | 'white' | 'darkGray';
  Icon?: FC<SVGProps<SVGSVGElement>>;
}

const cx = classNames.bind(styles);

const Button = ({
  textContent,
  variant,
  Icon,
  onClick
}: ButtonProps) => (
  <button onClick={onClick} className={cx( 'wrapper',`${variant}`)}>
    {Icon && <Icon/>}
    <span className={cx( 'wrapper__text', {colorBlack: variant === 'white'})}>{textContent}</span>
  </button>
);

Button.defaultProps = {
  variant: 'coral',
  Icon: null,
};

export default Button;
