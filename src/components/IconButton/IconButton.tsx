import React, {FC, SVGProps} from 'react';
import classNames from 'classnames/bind';
import styles from './IconButton.module.scss';

const cx = classNames.bind(styles);

export interface IconButtonProps {
  Icon: FC<SVGProps<SVGSVGElement>>;
  onClick: () => void;
}

const IconButton = ({ Icon, onClick, ...rest }: IconButtonProps) => {
  return (
    <button className={cx('wrapper')} onClick={onClick} {...rest}>
      <Icon />
    </button>
  );
};

export default IconButton;
