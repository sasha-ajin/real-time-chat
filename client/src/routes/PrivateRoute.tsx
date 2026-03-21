import { Navigate, Outlet, useLocation } from 'react-router-dom';

import { useAppSelector } from 'store/store';

export function PrivateRoute() {
  const isAuthenticated = useAppSelector((state) => state.auth.isAuthenticated);
  const location = useLocation();

  if (!isAuthenticated) {
    return <Navigate to="/sign-in" state={{ from: location }} replace />;
  }

  return <Outlet />;
}
