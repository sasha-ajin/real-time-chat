import { useEffect, useRef } from 'react';
import axios from 'axios';

import { useAppDispatch, useAppSelector, RootState } from 'store/store';
import { setupAxios } from 'store/setupAxios';
import { useStore } from 'react-redux';
import { AppRoutes } from 'routes/AppRoutes';
import { Navigation } from 'components/templates/Navigation';
import { connectSocket, disconnectSocket } from 'modules/chat/socket';

function App() {
  const dispatch = useAppDispatch();
  const store = useStore<RootState>();
  const axiosSetup = useRef(false);
  const isAuthenticated = useAppSelector((state) => state.auth.isAuthenticated);
  const accessToken = useAppSelector((state) => state.auth.accessToken);

  useEffect(() => {
    if (!axiosSetup.current) {
      setupAxios(axios, dispatch, store.getState);
      axiosSetup.current = true;
    }
  }, [dispatch, store]);

  useEffect(() => {
    if (isAuthenticated && accessToken) {
      connectSocket(accessToken);
    } else {
      disconnectSocket();
    }

    return () => {
      disconnectSocket();
    };
  }, [isAuthenticated, accessToken]);

  return (
    <div className="App">
      <Navigation />
      <AppRoutes />
    </div>
  );
}

export default App;
