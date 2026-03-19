import SignInFormCard from '@organisms/SignInFormCard';
import CenteredCardTemplate from 'components/templates/CenteredCardTemplate';

export function SignInPage() {
  return (
    <div>
      <CenteredCardTemplate>
        <SignInFormCard />
      </CenteredCardTemplate>
    </div>
  );
}
