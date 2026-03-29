import Container from 'react-bootstrap/Container';
import Spinner from 'react-bootstrap/Spinner';

type CenteredSpinnerProps = {
  maxWidth?: number;
};

function CenteredSpinner({ maxWidth = 600 }: CenteredSpinnerProps) {
  return (
    <Container className="mt-4 text-center" style={{ maxWidth }}>
      <Spinner animation="border" />
    </Container>
  );
}

export default CenteredSpinner;
