import { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from 'store/store';
import { LoadingState } from 'store/constants';
import { fetchThreads } from 'modules/threads/service';
import NarrowColumnTemplate from 'components/templates/NarrowColumnTemplate';
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
    <NarrowColumnTemplate>
      <h4 className="mb-3">Conversations</h4>
      <ThreadList threads={threads} currentUsername={currentUsername} />
    </NarrowColumnTemplate>
  );
}
