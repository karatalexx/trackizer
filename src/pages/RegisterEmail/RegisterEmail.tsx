import React, { useState } from 'react';
import classNames from 'classnames/bind';
import Logo from 'components/Logo/Logo';
import Input from 'components/Input/input';
import Button from 'components/Button/Button';
import PasswordStrengthMeter from 'components/PasswordStrengthMeter/PasswordStrengthMeter';
import { useForm, Controller } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { getAuth, createUserWithEmailAndPassword, updateProfile } from 'firebase/auth';
import { addDoc, collection } from 'firebase/firestore';
import { db } from '../../firebase';
import { initialUserConfig } from 'constants/initialUserConfig';
import { PUBLIC_PATHS } from 'constants/paths/publicPath';
import styles from './RegisterEmail.module.scss';

const cx = classNames.bind(styles);

const DEFAULT_PHOTO = 'https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png';

const RegisterEmail = () => {
  const navigate = useNavigate();
  const [firebaseError, setFirebaseError] = useState<string>('');
  const { watch, control } = useForm({
    defaultValues: {
      email: '',
      password: '',
    }
  });

  const { HOME, LOGIN } = PUBLIC_PATHS;

  const loginHandler = (email: string, pass: string) => {
    const auth = getAuth();
    createUserWithEmailAndPassword(auth, email, pass)
      .then(({user}) => {
        addDoc(collection(db,`${user.uid}`), initialUserConfig);
        if (!user?.photoURL) {
          updateProfile(user, {photoURL: DEFAULT_PHOTO});
        }
        if (!user?.displayName) {
          updateProfile(user, {displayName: user?.email?.split('@')[0]});
        }
        navigate(HOME)
      })
      .catch((error) => {
        const errorMessage = error.message;
        setFirebaseError(errorMessage);
      });
  };

  return (
    <form className={cx('container')}>
      <Logo onClick={() => navigate(HOME)} />
      <div className={cx('container__content')}>
        <Controller
          rules={{
            required: true,
            pattern: /^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/g
          }}
          control={control}
          name='email'
          render={({ field: { onChange, value } }) => (
            <Input
              onChange={onChange}
              value={value}
              label='E-mail address'
              type='email'
            />
          )}
        />
        <Controller
          control={control}
          name='password'
          render={({ field: { onChange, value } }) => (
            <Input
              onChange={onChange}
              value={value}
              type='password'
              label='Password'
            />
          )}
        />
        <span className={cx('container__error')}>{firebaseError}</span>
        <PasswordStrengthMeter password={watch('password')} />
        <span>Use 8 or more characters with a mix of letters, numbers & symbols.</span>
        <Button onClick={() => loginHandler(watch('email'), watch('password'))}>
        <span>
          Get started, it???s free!
        </span>
        </Button>
      </div>
      <div className={cx('container__footer')}>
        <span className={cx('container__footer_text')}>Do you have already an account?</span>
        <Button onClick={() => navigate(LOGIN)} variant='darkGray'>
        <span>
          Sign In
        </span>
        </Button>
      </div>
    </form>
  );
};

export default RegisterEmail;
