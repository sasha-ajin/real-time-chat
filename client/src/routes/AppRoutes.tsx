import { Routes, Route } from 'react-router-dom';

import { SignInPage } from 'pages/SignInPage';
import { SignUpPage } from 'pages/SignUpPage';
import { NotFoundPage } from 'pages/NotFoundPage';
import { PrivatePage } from 'pages/PrivatePage';
import { ThreadsPage } from 'pages/ThreadsPage';
import { SearchUsersPage } from 'pages/SearchUsersPage';
import { PrivateRoute } from 'routes/PrivateRoute';

export function AppRoutes() {
  return (
    <Routes>
      <Route path="/sign-in" element={<SignInPage />} />
      <Route path="/sign-up" element={<SignUpPage />} />
      <Route element={<PrivateRoute />}>
        <Route path="/" element={<PrivatePage />} />
        <Route path="/threads" element={<ThreadsPage />} />
        <Route path="/search-users" element={<SearchUsersPage />} />
      </Route>
      <Route path="*" element={<NotFoundPage />} />
    </Routes>
  );
}
