import ListGroup from 'react-bootstrap/ListGroup';

import { Thread } from 'modules/threads/service';
import ThreadItem from 'components/molecules/ThreadItem';
import MutedText from 'components/atoms/MutedText';

type ThreadListProps = {
  threads: Thread[];
  currentUsername: string | null;
};

function ThreadList({ threads, currentUsername }: ThreadListProps) {
  if (threads.length === 0) {
    return (
      <MutedText className="text-center">
        No conversations yet. Search for users to start chatting!
      </MutedText>
    );
  }

  return (
    <ListGroup>
      {threads.map((thread) => (
        <ThreadItem key={thread._id} thread={thread} currentUsername={currentUsername} />
      ))}
    </ListGroup>
  );
}

export default ThreadList;
