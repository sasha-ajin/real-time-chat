import { useNavigate } from 'react-router-dom';
import ListGroup from 'react-bootstrap/ListGroup';
import Badge from 'react-bootstrap/Badge';

import { Thread } from 'modules/threads/service';
import MutedText from 'components/atoms/MutedText';

type ThreadItemProps = {
  thread: Thread;
  currentUsername: string | null;
};

function ThreadItem({ thread, currentUsername }: ThreadItemProps) {
  const navigate = useNavigate();
  const otherParticipant = thread.participants.find(
    (p) => p.username !== currentUsername,
  );

  return (
    <ListGroup.Item
      action
      onClick={() => navigate(`/threads/${thread._id}`)}
      className="d-flex justify-content-between align-items-start"
    >
      <div className="ms-2 me-auto">
        <div className="fw-bold">{otherParticipant?.username ?? 'Unknown'}</div>
        {thread.lastMessage ? (
          <MutedText className="text-truncate d-block" style={{ maxWidth: 300 }}>
            {thread.lastMessage.text}
          </MutedText>
        ) : (
          <MutedText className="fst-italic">No messages yet</MutedText>
        )}
      </div>
      {thread.lastMessage && (
        <Badge bg="secondary" pill className="align-self-center">
          {new Date(thread.lastMessage.createdAt).toLocaleDateString()}
        </Badge>
      )}
    </ListGroup.Item>
  );
}

export default ThreadItem;
