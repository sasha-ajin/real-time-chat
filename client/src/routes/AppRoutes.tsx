import { Routes, Route } from 'react-router-dom';

import { SignInPage } from 'pages/SignInPage';
import { SignUpPage } from 'pages/SignUpPage';
import { NotFoundPage } from 'pages/NotFoundPage';
import { HomePage } from 'pages/HomePage';
import { ThreadsPage } from 'pages/ThreadsPage';
import { ChatPage } from 'pages/ChatPage';
import { SearchUsersPage } from 'pages/SearchUsersPage';
import { PrivateRoute } from 'routes/PrivateRoute';

export function AppRoutes() {
  return (
    <Routes>
      <Route path="/sign-in" element={<SignInPage />} />
      <Route path="/sign-up" element={<SignUpPage />} />
      <Route element={<PrivateRoute />}>
        <Route path="/" element={<HomePage />} />
        <Route path="/threads" element={<ThreadsPage />} />
        <Route path="/threads/:threadId" element={<ChatPage />} />
        <Route path="/search-users" element={<SearchUsersPage />} />
      </Route>
      <Route path="*" element={<NotFoundPage />} />
    </Routes>
  );
}
