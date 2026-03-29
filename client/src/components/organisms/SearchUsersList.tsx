import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import ListGroup from 'react-bootstrap/ListGroup';
import Button from 'react-bootstrap/Button';
import { UserResult } from 'modules/users/service';
import { createThread } from 'modules/threads/service';

type SearchUsersListProps = {
  results: UserResult[];
  loading: boolean;
};

function SearchUsersList({ results, loading }: SearchUsersListProps) {
  const navigate = useNavigate();
  const [startingChat, setStartingChat] = useState<string | null>(null);

  if (results.length === 0) {
    return null;
  }

  const handleStartChat = async (userId: string) => {
    setStartingChat(userId);
    try {
      const thread = await createThread(userId);
      navigate(`/threads/${thread._id}`);
    } finally {
      setStartingChat(null);
    }
  };

  return (
    <ListGroup className="mt-3">
      {results.map((user) => (
        <ListGroup.Item
          key={user.username}
          className="d-flex justify-content-between align-items-center"
        >
          <div>
            <strong>{user.username}</strong> — {user.email}
          </div>
          <Button
            variant="outline-primary"
            size="sm"
            onClick={() => handleStartChat(user._id)}
            disabled={startingChat === user._id}
          >
            {startingChat === user._id ? 'Opening...' : 'Chat'}
          </Button>
        </ListGroup.Item>
      ))}
    </ListGroup>
  );
}

export default SearchUsersList;
