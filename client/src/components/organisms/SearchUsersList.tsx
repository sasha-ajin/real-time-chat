import ListGroup from 'react-bootstrap/ListGroup';
import { UserResult } from 'modules/users/service';

type SearchUsersListProps = {
  results: UserResult[];
  loading: boolean;
};

function SearchUsersList({ results, loading }: SearchUsersListProps) {

  if (results.length === 0) {
    return null;
  }

  return (
    <ListGroup className="mt-3">
      {results.map((user) => (
        <ListGroup.Item key={user.username}>
          <strong>{user.username}</strong> — {user.email}
        </ListGroup.Item>
      ))}
    </ListGroup>
  );
}

export default SearchUsersList;
