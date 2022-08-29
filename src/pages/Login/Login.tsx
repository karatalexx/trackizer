import React, { useState } from 'react';
import classNames from 'classnames/bind';
import Logo from '../../components/Logo/Logo';
import Input from '../../components/Input/input';
import Button from '../../components/Button/Button';
import Checkbox from '../../components/Checkbox/Checkbox';
import { useNavigate } from 'react-router-dom';
import { Controller, useForm } from 'react-hook-form';
import { getAuth, signInWithEmailAndPassword } from 'firebase/auth';
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

  const checkboxHandler = () => setIsChecked((prevState) => !prevState);

  return (
    <form onSubmit={handleSubmit(() => navigate('/'))} className={cx('container')}>
      <Logo onClick={() => navigate('/')} />
      <div className={cx('container__content')}>
        <Controller
          control={control}
          name='email'
          render={({ field: { onChange, value } }) => (
            <Input onChange={onChange} value={value} label='Login'/>
          )}
        />
        <Controller
          control={control}
          name='password'
          render={({ field: { onChange, value } }) => (
            <Input onChange={onChange} value={value} type='password' label='Password'  />
          )}
        />
        <div className={cx('remember')}>
          <Checkbox
            checked={isChecked}
            onChange={checkboxHandler}
            label='Remember me'
          />
          <button
            onClick={() => navigate('/forgotPass')}
            className={cx('remember__password')}>
              Forgot password
          </button>
        </div>
        <Button onClick={() => signInWithEmailAndPassword(auth, watch('email'), watch('password'))} type='submit'>
          <span>
            Sign In
          </span>
        </Button>
      </div>
      <div className={cx('container__footer')}>
        <span className={cx('container__footer_text')}>If you don&apos;t have an account yet?</span>
        <Button onClick={() => navigate('/register')} variant='darkGray'>
          <span>
            Sign Un
          </span>
        </Button>
      </div>
    </form>
  );
};

export default Login;
