import { useEffect, useRef } from 'react';
import axios from 'axios';

import { useAppDispatch, RootState } from 'store/store';
import { setupAxios } from 'store/setupAxios';
import { useStore } from 'react-redux';
import { AppRoutes } from 'routes/AppRoutes';
import { Navigation } from 'components/organisms/Navigation';

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
      <Navigation />
      <AppRoutes />
    </div>
  );
}

export default App;
