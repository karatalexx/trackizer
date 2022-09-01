import React from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';
import Welcome from 'pages/Welcome/Welcome';
import RegisterEmail from 'pages/RegisterEmail/RegisterEmail';
import Register from 'pages/Register/Register';
import Login from 'pages/Login/Login';
import ForgotPass from 'pages/ForgotPass/ForgotPass';
import Home from 'pages/Home/Home';
import Loader from 'components/Loader/Loader';
import Budgets from 'pages/Budgets/Budgets';
import NewSubscription from 'pages/NewSubscription/NewSubscription';
import CalendarPage from './pages/CalendarPage/CalendarPage';
import { useAuthState } from 'react-firebase-hooks/auth';
import { getAuth } from 'firebase/auth';

const publicRoutes = [
  { path: '/', Component: Welcome },
  { path: '/register', Component: Register },
  { path: '/email', Component: RegisterEmail },
  { path: '/login', Component: Login },
  { path: '/forgotPass', Component: ForgotPass },
];

const privetRoutes = [
  { path: '/', Component: Home },
  { path: '/budgets', Component: Budgets },
  { path: '/new_subscription', Component: NewSubscription },
  { path: '/calendar', Component: CalendarPage },
];

function App() {
  const auth = getAuth();
  const [user, loading] = useAuthState(auth);

  if (loading) return <Loader />

  return (
    <Routes>
      {user ?
        (privetRoutes.map(({path, Component}) => (
          <Route key={path} path={path} element={<Component />} />
        ))) :
        (publicRoutes.map(({path, Component}) => (
          <Route key={path} path={path} element={<Component />} />
        ))) }
        <Route
          path="*"
          element={<Navigate to="/" replace />}
        />
    </Routes>
  );
}

export default App;
