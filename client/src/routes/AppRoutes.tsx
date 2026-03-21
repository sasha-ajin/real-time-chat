import { Routes, Route } from 'react-router-dom';

import { SignInPage } from 'pages/SignInPage';
import { SignUpPage } from 'pages/SignUpPage';
import { NotFoundPage } from 'pages/NotFoundPage';
import { PrivateRoute } from 'routes/PrivateRoute';

export function AppRoutes() {
  return (
    <Routes>
      <Route path="/sign-in" element={<SignInPage />} />
      <Route path="/sign-up" element={<SignUpPage />} />
      <Route element={<PrivateRoute />}>
        {/* Future protected routes go here */}
      </Route>
      <Route path="*" element={<NotFoundPage />} />
    </Routes>
  );
}
