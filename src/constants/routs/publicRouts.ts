import Welcome from 'pages/Welcome/Welcome';
import Register from 'pages/Register/Register';
import RegisterEmail from 'pages/RegisterEmail/RegisterEmail';
import Login from 'pages/Login/Login';
import ForgotPass from 'pages/ForgotPass/ForgotPass';
import { PUBLIC_PATHS } from '../paths/publicPath';

const { HOME, LOGIN, REGISTER, FORGOT_PASS, EMAIL } = PUBLIC_PATHS;

export const PUBLIC_ROUTS = [
  { path: HOME, Component: Welcome },
  { path: REGISTER, Component: Register },
  { path: EMAIL, Component: RegisterEmail },
  { path: LOGIN, Component: Login },
  { path: FORGOT_PASS, Component: ForgotPass },
];
