import React from 'react';
import classNames from 'classnames/bind';
import Logo from 'components/Logo/Logo';
import Button from 'components/Button/Button';
import { useNavigate } from 'react-router-dom';
import {
  getAuth,
  signInWithPopup,
  GoogleAuthProvider,
  FacebookAuthProvider
} from 'firebase/auth';
import { Auth, AuthProvider } from '@firebase/auth';
import { doc, setDoc } from 'firebase/firestore';
import { db } from '../../firebase';
import styles from './Register.module.scss';
import { ReactComponent as Google } from 'assets/icons/google.svg';
import { ReactComponent as Facebook } from 'assets/icons/facebook.svg';

const cx = classNames.bind(styles);

const initialUserConfig = {
  subsList: [],
  currency: 'USD($)',
  currencyList: ['USD($)', 'EURO(€)'],
  reminder: 'Every month',
  reminderList: ['Never', 'Every month', 'Every year'],
  availableSubsList: [
    {
      name: 'Spotify',
      category: 'Entertainment',
    },
    {
      name: 'YouTube Premium',
      category: 'Entertainment',
    },
    {
      name: 'Microsoft OneDrive',
      category: 'Security',
    },
    {
      name: 'Netflix',
      category: 'Entertainment',
    },
    {
      name: 'HBO GO',
      category: 'Entertainment',
    },
    ],
  monthBillsSum: 0,
  categoryList: [
    {
      name: 'Auto & Transport',
      limitValue: 400,
      color: '#00FAD9',
    },
    {
      name: 'Entertainment',
      limitValue: 600,
      color: '#FF7966',
    },
    {
      name: 'Security',
      limitValue: 600,
      color: '#AD7BFF',
    },
  ],
}

const Register = () => {
  const navigate = useNavigate();
  const googleProvider = new GoogleAuthProvider();
  const facebookProvider = new FacebookAuthProvider();
  const auth = getAuth();

  const signUpHandler = (auth: Auth, provider: AuthProvider) => {
    signInWithPopup(auth, provider)
      .then(({user: { uid }}) => {
        setDoc(doc(db,`${uid}`, 'appsInfo'), initialUserConfig);
        navigate('/')
      })
      .catch((error) => new Error(error.message))
  };

  return (
    <div className={cx('container')}>
      <Logo onClick={() => navigate('/')} />
      <div className={cx('container__content')}>
        <div className={cx('container__btns')}>
           <Button
             variant='white'
             Icon={Google}
             onClick={() => signUpHandler(auth, googleProvider)}>
            <span>Sign up with Google</span>
           </Button>
          <Button
            variant='blue'
            Icon={Facebook}
            onClick={() => signUpHandler(auth, facebookProvider)}>
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
