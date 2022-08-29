import React from 'react';
import classNames from 'classnames/bind';
import Logo from '../../components/Logo/Logo';
import Button from '../../components/Button/Button';
import { useNavigate } from 'react-router-dom';
import styles from './Welcome.module.scss';

const cx = classNames.bind(styles);

const Welcome = () => {
  const navigate = useNavigate();

  return (
    <div className={cx('container')}>
      <Logo onClick={() => navigate('/')} size='big' />
      <div className={cx('btn__group')}>
        <Button onClick={() => navigate('/register')}>
          <span>
            Get started
          </span>
        </Button>
        <Button onClick={() => navigate('/login')} variant='darkGray'>
          <span>
            I have an account
          </span>
        </Button>
      </div>
    </div>
  );
};

export default Welcome;
