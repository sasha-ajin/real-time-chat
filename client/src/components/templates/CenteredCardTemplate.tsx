import { ReactNode } from 'react';
import Container from 'react-bootstrap/Container';
import Col from 'react-bootstrap/Col';

type CenteredCardTemplateProps = {
  children: ReactNode;
};

function CenteredCardTemplate({ children }: CenteredCardTemplateProps) {
  return (
    <Container className="d-flex mt-5 justify-content-center">
      <Col md={6} lg={4} sm={12} className="shadow rounded p-2">
        {children}
      </Col>
    </Container>
  );
}

export default CenteredCardTemplate;
