import { useState, useCallback } from 'react';
import CenteredCardTemplate from 'components/templates/CenteredCardTemplate';
import SearchUsersFormCard from 'components/organisms/SearchUsersFormCard';
import SearchUsersList from 'components/organisms/SearchUsersList';
import { searchUsers, UserResult } from 'modules/users/service';

export function SearchUsersPage() {
  const [results, setResults] = useState<UserResult[]>([]);
  const [loading, setLoading] = useState(false);

  const handleSearch = useCallback(async (userName: string) => {
    setLoading(true);
    try {
      const data = await searchUsers(userName);
      setResults(data);
    } finally {
      setLoading(false);
    }
  }, []);

  return (
    <CenteredCardTemplate>
      <SearchUsersFormCard onSearch={handleSearch} />
      <SearchUsersList results={results} loading={loading} />
    </CenteredCardTemplate>
  );
}
