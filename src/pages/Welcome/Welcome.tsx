import React from 'react';
import classNames from 'classnames/bind';
import Logo from 'components/Logo/Logo';
import Button from 'components/Button/Button';
import { useNavigate } from 'react-router-dom';
import { PUBLIC_PATHS } from 'constants/paths/publicPath';
import styles from './Welcome.module.scss';

const cx = classNames.bind(styles);

const Welcome = () => {
  const navigate = useNavigate();
  const { LOGIN, REGISTER, HOME } = PUBLIC_PATHS;

  return (
    <div className={cx('container')}>
      <Logo onClick={() => navigate(HOME)} size='big' />
      <div className={cx('btn__group')}>
        <Button onClick={() => navigate(REGISTER)}>
          <span>
            Get started
          </span>
        </Button>
        <Button onClick={() => navigate(LOGIN)} variant='darkGray'>
          <span>
            I have an account
          </span>
        </Button>
      </div>
    </div>
  );
};

export default Welcome;
