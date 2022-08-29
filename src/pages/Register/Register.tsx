import React from 'react';
import classNames from 'classnames/bind';
import Logo from '../../components/Logo/Logo';
import Button from '../../components/Button/Button';
import { useNavigate } from 'react-router-dom';
import {
  getAuth,
  signInWithPopup,
  GoogleAuthProvider,
  FacebookAuthProvider
} from 'firebase/auth';
import styles from './Register.module.scss';
import { ReactComponent as Google } from 'assets/icons/google.svg';
import { ReactComponent as Facebook } from 'assets/icons/facebook.svg';

const cx = classNames.bind(styles);

const Register = () => {
  const navigate = useNavigate();
  const googleProvider = new GoogleAuthProvider();
  const facebookProvider = new FacebookAuthProvider();
  const auth = getAuth();

  return (
    <div className={cx('container')}>
      <Logo onClick={() => navigate('/')} />
      <div className={cx('container__content')}>
        <div className={cx('container__btns')}>
           <Button
             variant='white'
             Icon={Google}
             onClick={() => signInWithPopup(auth, googleProvider)}>
            <span>Sign up with Google</span>
           </Button>
          <Button
            variant='blue'
            Icon={Facebook}
            onClick={() => signInWithPopup(auth, facebookProvider)}>
            <span>Sign up with Facebook</span>
          </Button>
        </div>
        <span>or</span>
        <Button onClick={() => navigate('/email')} variant='darkGray'>
          <span>Sign up with E-mail</span>
        </Button>
        <span className={cx('footer__text')}>
          By registering, you agree to our Terms of Use. Learn how we collect, use and share your data.
        </span>
      </div>
    </div>
  );
};

export default Register;
