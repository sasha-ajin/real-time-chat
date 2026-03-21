import { useEffect, useRef } from 'react';
import axios from 'axios';

import { SignUpPage } from 'pages/SignUpPage';
import { SignInPage } from 'pages/SignInPage';
import { useAppDispatch, RootState } from 'store/store';
import { setupAxios } from 'store/setupAxios';
import { useStore } from 'react-redux';

function App() {
  const dispatch = useAppDispatch();
  const store = useStore<RootState>();
  const axiosSetup = useRef(false);

  useEffect(() => {
    if (!axiosSetup.current) {
      setupAxios(axios, dispatch, store.getState);
      axiosSetup.current = true;
    }
  }, [dispatch, store]);

  return (
    <div className="App">
      <SignUpPage/>
      <SignInPage/>
    </div>
  );
}

export default App;
