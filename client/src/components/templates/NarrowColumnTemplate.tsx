import { ReactNode } from 'react';
import Container from 'react-bootstrap/Container';
import clsx from 'clsx';

type NarrowColumnTemplateProps = {
  children: ReactNode;
  className?: string;
  style?: React.CSSProperties;
};

function NarrowColumnTemplate({ children, className, style }: NarrowColumnTemplateProps) {
  return (
    <Container
      className={clsx('mt-4', className)}
      style={{ maxWidth: 600, ...style }}
    >
      {children}
    </Container>
  );
}

export default NarrowColumnTemplate;
