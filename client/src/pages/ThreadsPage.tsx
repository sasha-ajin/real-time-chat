import { useEffect } from 'react';
import Container from 'react-bootstrap/Container';

import { useAppDispatch, useAppSelector } from 'store/store';
import { LoadingState } from 'store/constants';
import { fetchThreads } from 'modules/threads/service';
import CenteredSpinner from 'components/molecules/CenteredSpinner';
import ThreadList from 'components/organisms/ThreadList';

export function ThreadsPage() {
  const dispatch = useAppDispatch();
  const { threads, loading } = useAppSelector((state) => state.threads);
  const currentUsername = useAppSelector((state) => state.auth.username);

  useEffect(() => {
    dispatch(fetchThreads());
  }, [dispatch]);

  if (loading === LoadingState.Pending) {
    return <CenteredSpinner />;
  }

  return (
    <Container className="mt-4" style={{ maxWidth: 600 }}>
      <h4 className="mb-3">Conversations</h4>
      <ThreadList threads={threads} currentUsername={currentUsername} />
    </Container>
  );
}
