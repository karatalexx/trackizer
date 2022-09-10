import React, { FC, SVGProps } from 'react';
import classNames from 'classnames/bind';
import styles from './IconButton.module.scss';

const cx = classNames.bind(styles);

export interface IconButtonProps {
  Icon: FC<SVGProps<SVGSVGElement>>;
  onClick: () => void;
  isActive?: boolean;
  testId?: string;
}

const IconButton = ({ Icon, onClick, isActive, testId }: IconButtonProps) => {
  return (
    <button className={cx('wrapper', {active: isActive})} onClick={onClick}>
      <Icon data-testid={testId} />
    </button>
  );
};

IconButton.defaultProps = {
  isActive: false,
}

export default IconButton;
