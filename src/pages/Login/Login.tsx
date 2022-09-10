import React, { useState } from 'react';
import classNames from 'classnames/bind';
import Logo from 'components/Logo/Logo';
import Input from 'components/Input/input';
import Button from 'components/Button/Button';
import Checkbox from 'components/Checkbox/Checkbox';
import { useNavigate } from 'react-router-dom';
import { Controller, useForm } from 'react-hook-form';
import { getAuth, signInWithEmailAndPassword } from 'firebase/auth';
import { PRIVATE_PATHS } from 'constants/paths/privatePaths';
import { PUBLIC_PATHS } from 'constants/paths/publicPath';
import styles from './Login.module.scss';

const cx = classNames.bind(styles);

const Login = () => {
  const auth = getAuth();
  const navigate = useNavigate();
  const [isChecked, setIsChecked] = useState(false);
  const { control, watch, handleSubmit } = useForm({
    defaultValues: {
      email: '',
      password: '',
    }
  });

  const { FORGOT_PASS, REGISTER } = PUBLIC_PATHS;
  const { HOME } = PRIVATE_PATHS;

  const checkboxHandler = () => setIsChecked((prevState) => !prevState);

  return (
    <form onSubmit={handleSubmit(() => navigate(HOME))} className={cx('container')}>
      <Logo onClick={() => navigate(HOME)} />
      <div className={cx('container__content')}>
        <Controller
          control={control}
          name='email'
          render={({ field: { onChange, value } }) => (
            <Input
              onChange={onChange}
              value={value}
              label='Login'
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
        <div className={cx('remember')}>
          <Checkbox
            checked={isChecked}
            onChange={checkboxHandler}
            label='Remember me'
          />
          <button
            onClick={() => navigate(FORGOT_PASS)}
            className={cx('remember__password')}>
              Forgot password
          </button>
        </div>
        <Button
          onClick={() => signInWithEmailAndPassword(auth, watch('email'), watch('password'))}
          type='submit'
        >
          <span>
            Sign In
          </span>
        </Button>
      </div>
      <div className={cx('container__footer')}>
        <span className={cx('container__footer_text')}>If you don&apos;t have an account yet?</span>
        <Button onClick={() => navigate(REGISTER)} variant='darkGray'>
          <span>
            Sign Un
          </span>
        </Button>
      </div>
    </form>
  );
};

export default Login;
