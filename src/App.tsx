import React from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';
import Loader from 'components/Loader/Loader';
import { useAuthState } from 'react-firebase-hooks/auth';
import { getAuth } from 'firebase/auth';
import { PRIVATE_ROUTS } from './constants/routs/privateRouts';
import { PUBLIC_ROUTS } from './constants/routs/publicRouts';

function App() {
  const auth = getAuth();
  const [user, loading] = useAuthState(auth);

  if (loading) return <Loader />

  return (
    <Routes>
      {user ?
        (PRIVATE_ROUTS.map(({path, Component}) => (
          <Route key={path} path={path} element={<Component />} />
        ))) :
        (PUBLIC_ROUTS.map(({path, Component}) => (
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
