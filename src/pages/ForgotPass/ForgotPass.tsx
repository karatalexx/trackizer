import React, { useState } from 'react';
import classNames from 'classnames/bind';
import Logo from 'components/Logo/Logo';
import Input from 'components/Input/input';
import Button from 'components/Button/Button';
import { useNavigate } from 'react-router-dom';
import { Controller, useForm } from 'react-hook-form';
import { getAuth, sendPasswordResetEmail } from 'firebase/auth';
import { PRIVATE_PATHS } from 'constants/paths/privatePaths';
import styles from './ForgotPass.module.scss';

const cx = classNames.bind(styles);

const ForgotPass = () => {
  const navigate = useNavigate();
  const auth = getAuth();
  const [firebaseError, setFirebaseError] = useState<string>('');
  const { watch, control } = useForm({
    defaultValues: {
      email: '',
      password: '',
    }
  });
  const submitHandler = (email: string) => {
    return sendPasswordResetEmail(auth, email, {url: 'https://localhost:3000'})
      .catch((error) => {
        const errorMessage = error.message;
        setFirebaseError(errorMessage);
      }
    );
  };

  return (
    <form className={cx('container')}>
      <Logo onClick={() => navigate(PRIVATE_PATHS.HOME)} />
      <div className={cx('container__content')}>
        <Controller
          rules={{
            required: true,
            pattern: /^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/g
          }}
          control={control}
          name='email'
          render={({ field: { onChange, value } }) => (
            <div>
              <Input
                onChange={onChange}
                value={value}
                label='E-mail address'
                type='email'/>
              <span className={cx('container__error')}>{firebaseError}</span>
            </div>
          )}
        />
        <Button onClick={() => submitHandler(watch('email'))} type='submit'>
        <span>
          Submit
        </span>
        </Button>
      </div>
    </form>
  );
};

export default ForgotPass;
