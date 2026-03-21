import SignUpFormCard from 'components/organisms/SignUpFormCard';
import RedirectProposition from 'components/molecules/RedirectProposition';
import CenteredCardTemplate from 'components/templates/CenteredCardTemplate';

export function SignUpPage() {
  return (
    <div>
      <CenteredCardTemplate>
        <SignUpFormCard />
        <RedirectProposition text="Already have an account?" link="/sign-in" linkText="Sign In" />
      </CenteredCardTemplate>
    </div>
  );
}
