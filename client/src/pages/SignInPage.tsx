import SignInFormCard from 'components/organisms/SignInFormCard';
import RedirectProposition from 'components/molecules/RedirectProposition';
import CenteredCardTemplate from 'components/templates/CenteredCardTemplate';

export function SignInPage() {
  return (
    <div>
      <CenteredCardTemplate>
        <SignInFormCard />
        <RedirectProposition text="Don't have an account?" link="/sign-up" linkText="Sign Up" />
      </CenteredCardTemplate>
    </div>
  );
}
